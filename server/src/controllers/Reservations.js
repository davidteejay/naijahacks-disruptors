/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Reservations from '../models/Reservations';
import { generateId } from '../helpers/generators';
import { serverError } from '../helpers/errors';

export default class ReservationController {
  static async add(req, res) {
    try {
      const id = await generateId(res, Reservations);

      await new Reservations({ id, ...req.body })
        .save()
        .then((data) => res.status(200).send({
          data,
          message: 'Reservation added successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      await Reservations
        .find({ ...req.query, isDeleted: false })
        .then((data) => res.status(200).send({
          data,
          message: 'Reservations fetched successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async getOne(req, res) {
    try {
      const { reservation } = req.data;

      return res.status(200).send({
        data: reservation,
        message: 'Reservation fetched successfully',
        error: false,
      });
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      await Reservations
        .findOneAndUpdate({ id }, { ...req.body }, { new: true })
        .then((data) => res.status(200).send({
          data,
          message: 'Reservation updated Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      await Reservations
        .findOneAndUpdate({ id }, { isDeleted: false }, { new: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'Reservation deleted Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async accept(req, res) {
    try {
      const { id } = req.params;

      await Reservations
        .findOneAndUpdate({ id }, { status: 'accepted' }, { new: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'Reservation accepted Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async reject(req, res) {
    try {
      const { id } = req.params;

      await Reservations
        .findOneAndUpdate({ id }, { status: 'rejected' }, { new: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'Reservation rejected Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async checkIn(req, res) {
    try {
      const { id } = req.params;

      await Reservations
        .findOneAndUpdate({ id }, { checkInTime: new Date() }, { new: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'Reservation checked in Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }

  static async checkOut(req, res) {
    try {
      const { id } = req.params;

      await Reservations
        .findOneAndUpdate({ id }, { checkOutTime: new Date(), status: 'completed' }, { new: true })
        .then(() => res.status(200).send({
          data: null,
          message: 'Reservation checked out Successfully',
          error: false,
        }))
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
