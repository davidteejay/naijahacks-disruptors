/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import crypto from 'crypto';

import Users from '../models/Users';
import { generateToken } from '../helpers/generators';
import { serverError, notFoundError } from '../helpers/errors';

export default class UserController {
  static async getAll(req, res) {
    try {
      await Users
        .find({ ...req.query, isDeleted: false })
        .then((data) => res.status(200).send({
          data,
          message: 'All Users Fetched',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;

      await Users
        .findOne({ _id: id, isDeleted: false })
        .then((data) => {
          if (data === null) return notFoundError(res, 'User not found');
          return res.status(200).send({
            data,
            message: 'User Fetched',
            error: false,
          });
        })
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async signUp(req, res) {
    try {
      const { hash, salt } = req.data;

      await new Users({ ...req.body, hash, salt })
        .save()
        .populate('saved')
        .populate('homes')
        .then(async (data) => {
          const token = await generateToken(res, data);
          return res.status(200).send({
            data: { ...data._doc, token },
            message: 'Signup Successful',
            error: false,
          });
        })
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      await Users
        .findOne({ email, isDeleted: false })
        .populate('saved')
        .populate('homes')
        .then(async (data) => {
          if (data === null) return notFoundError(res, 'Email or Password is incorrect');

          const hash = crypto.pbkdf2Sync(password, data.salt, 10000, 512, 'sha512').toString('hex');

          if (hash !== data.hash) return notFoundError(res, 'Email or Password is incorrect');

          const token = await generateToken(res, data);
          return res.status(200).send({
            data: { ...data._doc, token },
            message: 'Login Successful',
            error: false,
          });
        })
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;

      await Users.findByIdAndUpdate(id, { ...req.body }, { new: true })
        .then((data) => res.status(200).send({
          data,
          message: 'User Updated Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      await Users.findByIdAndUpdate(id, { isDeleted: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'User Deleted Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async refreshToken(req, res) {
    try {
      const { user } = req.data;

      const newToken = await generateToken(res, user);

      return res.status(200).send({
        data: { newToken },
        message: 'Token refreshed successfully',
        error: false,
      });
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async changePassword(req, res) {
    try {
      const { user: { _id }, salt, hash } = req.data;

      await Users
        .findByIdAndUpdate(_id, { salt, hash })
        .then((data) => res.status(200).send({
          data,
          message: 'Password changed successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
