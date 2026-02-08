import { Router } from 'express';
import * as packageController from '../controllers/packageController';

const router = Router();

router.get('/', packageController.getPackages);
router.post('/scrape', packageController.triggerScrape);
router.get('/:id', packageController.getPackageDetail);

export default router;
