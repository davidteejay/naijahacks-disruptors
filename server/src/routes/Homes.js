/* eslint-disable max-len */
import express from 'express';

import AuthMiddleware from '../middlewares/Auth';
import HomeMiddleware from '../middlewares/Homes';
import UserMiddleware from '../middlewares/Users';
import HomeController from '../controllers/Homes';

const router = express.Router();

router
  .route('/')
  .post(AuthMiddleware.validateToken, HomeMiddleware.validateData, UserMiddleware.makeUserHost, HomeController.addHome)
  .get(HomeController.getHomes);

router.post('/approve/:id', AuthMiddleware.validateToken, UserMiddleware.checkIfUserIsAdmin, HomeMiddleware.checkIfIdExists, HomeController.approveHome);
router.post('/reject/:id', AuthMiddleware.validateToken, UserMiddleware.checkIfUserIsAdmin, HomeMiddleware.checkIfIdExists, HomeController.rejectHome);

router
  .route('/:id')
  .get(HomeMiddleware.checkIfIdExists, HomeController.getHome)
  .put(AuthMiddleware.validateToken, HomeMiddleware.checkIfIdExists, HomeController.updateHome)
  .delete(AuthMiddleware.validateToken, HomeMiddleware.checkIfIdExists, HomeController.deleteHome);

export default router;
