/* eslint-disable consistent-return */
import { generateToken } from '../helpers/generators';
import { serverError, accessDenied } from '../helpers/errors';
import Users from '../models/Users';

export default class TokenController {
  static async refreshToken(req, res) {
    try {
      const { auth: { _id } } = req.data;

      await Users
        .findById(_id)
        .then(async (data) => {
          if (data === null) return accessDenied(res, 'Session expired. Please login again to create a new session');

          const token = await generateToken(res, data);
          return res.status(200).send({
            data: token,
            message: 'Token refreshed successfully',
            error: false,
          });
        })
        .catch((err) => serverError(res, err.message));
    } catch (err) {
      return serverError(res, err.message);
    }
  }
}
