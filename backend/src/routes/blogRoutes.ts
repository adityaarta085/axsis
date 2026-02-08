import { Router } from 'express';
import * as blogController from '../controllers/blogController';
const router = Router();
router.get('/', blogController.getPosts);
router.get('/:slug', blogController.getPostDetail);
export default router;
