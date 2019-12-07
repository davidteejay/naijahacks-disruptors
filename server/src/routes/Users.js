/* eslint-disable max-len */
import express from 'express';

import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/Users';
import AuthMiddleware from '../middlewares/Auth';

const router = express.Router();

router.get('/', AuthMiddleware.validateToken, UserMiddleware.checkIfUserIsAdmin, UserController.getAll);

router.post('/signup', UserMiddleware.validateData, UserMiddleware.checkIfEmailExists, UserMiddleware.encryptPassword, UserController.signUp);
router.post('/login', UserController.login);
router.post('/change-password', AuthMiddleware.validateToken, UserMiddleware.validatePassword, UserMiddleware.encryptPassword, UserController.changePassword);

router
  .route('/:id')
  .get(AuthMiddleware.validateToken, AuthMiddleware.checkIfIdIsValid, UserController.getOne)
  .put(AuthMiddleware.validateToken, AuthMiddleware.checkIfIdIsValid, UserController.updateUser)
  .delete(AuthMiddleware.validateToken, AuthMiddleware.checkIfIdIsValid, UserMiddleware.checkIfUserIsAdmin, UserController.deleteUser);

export default router;
