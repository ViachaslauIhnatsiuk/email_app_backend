import { Router } from 'express';
import { signIn } from '../controllers/authController';

const authRoutes = Router();

authRoutes.post('/welcome', signIn);

export { authRoutes };
