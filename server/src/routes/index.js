import express from 'express';

import Token from './Token';
import Users from './Users';

const router = express.Router();

router.use('/token', Token);
router.use('/users', Users);

router.use('/*', (req, res) => res.status(404).send({
  data: null,
  message: 'Incorrect Route',
  error: true,
}));

export default router;
