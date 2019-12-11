/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import { Types } from 'mongoose';
import Joi from 'joi';

import Homes from '../models/Homes';
import {
  serverError, notFoundError, incompleteDataError,
} from '../helpers/errors';

const { ObjectId } = Types;

export default class HomeMiddleware {
  static async validateData(req, res, next) {
    try {
      const schema = Joi.object().keys({
        createdBy: Joi.string().trim().min(3).required(),
        title: Joi.string().trim().min(3).required(),
        description: Joi.string().trim().min(3).required(),
        address: Joi.string().trim().min(3).required(),
        city: Joi.string().trim().min(3).required(),
        state: Joi.string().trim().min(3).required(),
        amenities: Joi.array().items(Joi.string()).min(1),
        media: Joi.array().items(Joi.string()).min(1),
        availableRooms: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
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
        await Homes
          .findOne({ id, isDeleted: false })
          .then((data) => {
            if (data === null) {
              return notFoundError(res, 'Home Not Found');
            }

            req.data = {
              ...req.data,
              home: data,
            };
            return next();
          })
          .catch((err) => serverError(res, err.message));
      } else {
        return notFoundError(res, 'Home Not Found');
      }
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
