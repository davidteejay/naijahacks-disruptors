/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import { Types } from 'mongoose';
import crypto from 'crypto';
import Joi from 'joi';

import Users from '../models/Users';
import {
  serverError, alreadyExistsError, notFoundError, incompleteDataError, accessDenied,
} from '../helpers/errors';

const { ObjectId } = Types;

export default class UserMiddleware {
  static async validateData(req, res, next) {
    try {
      const schema = Joi.object().keys({
        firstName: Joi.string().trim().min(3).required(),
        lastName: Joi.string().trim().min(3).required(),
        dob: Joi.date().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(6).required(),
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

  static async checkIfEmailExists(req, res, next) {
    try {
      const { email } = req.body;

      await Users.findOne({ email, isDeleted: false })
        .then((data) => {
          if (data === null) {
            return next();
          }

          return alreadyExistsError(res, 'Email Already Exists');
        })
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async checkIfIdExists(req, res, next) {
    try {
      const { id } = req.params;

      if (ObjectId.isValid(id) && new ObjectId(id) == id) {
        await Users.findById(id)
          .then((data) => {
            if (data === null) {
              return notFoundError(res, 'User Not Found');
            }

            req.data = {
              ...req.data,
              user: data,
            };
            return next();
          })
          .catch((err) => serverError(res, err.message));
      } else {
        return notFoundError(res, 'User Not Found');
      }
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async checkIfUserIsAdmin(req, res, next) {
    try {
      const { auth: { isAdmin } } = req.data;

      if (isAdmin) next();

      return accessDenied(res);
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async encryptPassword(req, res, next) {
    try {
      const { password } = req.body;

      const salt = await crypto.randomBytes(16).toString('hex');
      const hash = await crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

      req.data = {
        ...req.data,
        hash,
        salt,
      };

      return next();
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async validatePassword(req, res, next) {
    try {
      const password = req.body.oldPassword;
      const { user: { salt, hash } } = req.data;

      const verHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

      if (hash === verHash) return next();

      return notFoundError(res, 'Password is incorrect');
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
