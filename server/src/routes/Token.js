import express from 'express';

import AuthMiddleware from '../middlewares/Auth';
import TokenController from '../controllers/Token';

const router = express.Router();

router.post('/refresh', AuthMiddleware.validateToken, TokenController.refreshToken);

export default router;
