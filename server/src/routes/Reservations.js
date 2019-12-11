/* eslint-disable max-len */
import express from 'express';

import AuthMiddleware from '../middlewares/Auth';
import ReservationMiddleware from '../middlewares/Reservations';
import ReservationController from '../controllers/Reservations';

const router = express.Router();

router
  .route('/')
  .post(AuthMiddleware.validateToken, ReservationMiddleware.validateData, ReservationController.add)
  .get(AuthMiddleware.validateToken, ReservationController.getAll);

router.post('/checkin/:id', AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.checkIn);
router.post('/checkout/:id', AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.checkOut);
router.post('/accept/:id', AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.accept);
router.post('/reject/:id', AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.reject);

router
  .route('/:id')
  .get(AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.getOne)
  .put(AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.updateHome)
  .delete(AuthMiddleware.validateToken, ReservationMiddleware.checkIfIdExists, ReservationController.deleteHome);

export default router;
