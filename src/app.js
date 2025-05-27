import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/index.js';
import routes from './routes/index.js';
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', routes);
// Error handling middleware
app.use(errorMiddleware);

export default app;
