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

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true  // 💡 This is important to allow cookies!
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Mount Auth routes
app.use('/api/auth', authRouter);

// ✅ Protect entries routes properly
app.use('/api/entries', protect, entriesRouter);

app.get('/', (_req, res) => {
  res.send('🟢 Track Samyak backend is running');
});

export default app;
