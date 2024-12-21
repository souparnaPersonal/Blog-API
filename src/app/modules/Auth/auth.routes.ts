import express from 'express';
import { authController } from './auth.controllers';
import validateRequest from '../../middleware/ValidateRequest';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/register',
  validateRequest(authValidation.createUserValidaiton),
  authController.createUser,
);
router.post(
  '/auth/login',
  validateRequest(authValidation.loginUserValidaiton),
  authController.loginUser,
);

export const AuthRoutes = router;
