/* eslint-disable consistent-return */
/* eslint-disable no-loop-func */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { serverError } from './errors';

dotenv.config();
const { SECRET } = process.env;

export const generateToken = async (res, user) => {
  try {
    const token = await jwt.sign({ user }, SECRET, {
      expiresIn: '2w',
    });

    return token;
  } catch (err) {
    return serverError(res, err.message);
  }
};

export const generateId = async (res, model) => {
  try {
    let exists = true;

    while (exists) {
      const id = (Math.random() * 1000000).toPrecision(6);
      model
        .findOne({ id })
        .then((data) => {
          if (data === null) {
            exists = false;
            return id;
          }
        })
        .catch((err) => {
          exists = false;
          return serverError(res, err.message);
        });

      return id;
    }
  } catch (err) {
    return serverError(res, err.message);
  }
};
