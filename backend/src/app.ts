import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, successResponse } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import packageRoutes from './routes/packageRoutes';
import coverageRoutes from './routes/coverageRoutes';
import blogRoutes from './routes/blogRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import * as faqService from './services/faqService';

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/faqs', async (req, res, next) => {
  try {
    const faqs = await faqService.getAllFaqs();
    successResponse(res, faqs);
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/coverage', coverageRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/checkout', checkoutRoutes);

app.use(errorHandler);

export default app;
