import { Router } from 'express';
import * as scrapeController from '../controllers/scrapeController';

const router = Router();

router.get('/axis', scrapeController.scrapeAxisRealtime);

export default router;
