import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import { protect } from './controllers/authController';
import entriesRouter from './routes/entries';

const app = express();

const whitelist = [
  'http://localhost:5173',
  'https://daily-progress-tracker-samyak.vercel.app'
];

// 1) Use array‑based origin and credentials:true
app.use(cors({
  origin: whitelist,
  credentials: true
}));

// 2) Handle preflight for all routes
app.options('*', cors({
  origin: whitelist,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 3) Mount auth routes (public)
app.use('/api/auth', authRouter);

// 4) Protect entries routes
app.use('/api/entries', protect, entriesRouter);

app.get('/', (_req, res) => {
  res.send('🟢 Track Samyak backend is running');
});

export default app;
