/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Homes from '../models/Homes';
import Users from '../models/Users';
import { generateId } from '../helpers/generators';
import { serverError } from '../helpers/errors';

export default class HomeController {
  static async addHome(req, res) {
    try {
      const id = await generateId(res, Homes);
      const { createdBy } = req.body;
      const homes = req.data.auth.homes || [];

      await new Homes({ id, ...req.body })
        .save()
        .then(async (data) => {
          const ids = homes.map((home) => home._id);

          await Users
            .findByIdAndUpdate(createdBy, { homes: [...ids, data._id] })
            .then(() => res.status(200).send({
              data,
              message: 'Home added successfully',
              error: false,
            }))
            .catch((err) => serverError(res, err.message));
        })
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async getHomes(req, res) {
    try {
      await Homes
        .find({ ...req.query, isDeleted: false })
        .then((data) => res.status(200).send({
          data,
          message: 'Homes fetched successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async getHome(req, res) {
    try {
      const { home } = req.data;

      return res.status(200).send({
        data: home,
        message: 'Home fetched successfully',
        error: false,
      });
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async updateHome(req, res) {
    try {
      const { id } = req.params;

      await Homes
        .findOneAndUpdate({ id }, { ...req.body }, { new: true })
        .then((data) => res.status(200).send({
          data,
          message: 'Home updated Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async deleteHome(req, res) {
    try {
      const { id } = req.params;

      await Homes
        .findOneAndUpdate({ id }, { isDeleted: false }, { new: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'Home deleted Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async verifyHome(req, res) {
    try {
      const { id } = req.params;

      await Homes
        .findOneAndUpdate({ id }, { isVerified: true }, { new: true })
        .then((data) => res.status(200).send({
          data,
          message: 'Home updated Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
