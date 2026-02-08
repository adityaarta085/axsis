import { Router } from 'express';
import * as authController from '../controllers/authController';
const router = Router();
router.post('/otp', authController.requestOtp);
router.post('/verify', authController.verifyOtp);
export default router;
