import express from 'express';
import { authController } from './auth.controllers';

const router = express.Router();

router.post('/auth/register', authController.createUser);
router.post('/auth/login', authController.loginUser);

export const AuthRoutes = router;
