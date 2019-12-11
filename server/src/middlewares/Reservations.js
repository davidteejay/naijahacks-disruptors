/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import { Types } from 'mongoose';
import Joi from 'joi';

import Reservations from '../models/Reservations';
import {
  serverError, notFoundError, incompleteDataError,
} from '../helpers/errors';

const { ObjectId } = Types;

export default class ReservationMiddleware {
  static async validateData(req, res, next) {
    try {
      const schema = Joi.object().keys({
        home: Joi.string().trim().min(3).required(),
        user: Joi.string().trim().min(3).required(),
        guests: Joi.number().min(0).required(),
        checkIn: Joi.date().required(),
        checkOut: Joi.date().required(),
      });

      await schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((error) => {
          const errors = error.details.map((d) => d.message);
          return incompleteDataError(res, errors);
        });
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async checkIfIdExists(req, res, next) {
    try {
      const { id } = req.params;

      if (ObjectId.isValid(id) && new ObjectId(id) == id) {
        await Reservations
          .findOne({ id, isDeleted: false })
          .then((data) => {
            if (data === null) {
              return notFoundError(res, 'Reservation Not Found');
            }

            req.data = {
              ...req.data,
              reservation: data,
            };
            return next();
          })
          .catch((err) => serverError(res, err.message));
      } else {
        return notFoundError(res, 'Reservation Not Found');
      }
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
