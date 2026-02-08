import { Router } from 'express';
import * as coverageController from '../controllers/coverageController';
const router = Router();
router.get('/', coverageController.getCoverage);
export default router;
