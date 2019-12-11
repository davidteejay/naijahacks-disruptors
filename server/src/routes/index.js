import express from 'express';

import Token from './Token';
import Users from './Users';
import Homes from './Homes';
import Reservations from './Reservations';

const router = express.Router();

router.use('/token', Token);
router.use('/users', Users);
router.use('/homes', Homes);
router.use('/reservations', Reservations);

router.use('/*', (req, res) => res.status(404).send({
  data: null,
  message: 'Incorrect Route',
  error: true,
}));

export default router;
