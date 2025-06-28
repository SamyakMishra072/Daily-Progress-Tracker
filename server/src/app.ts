import express from 'express';
import cors from 'cors';
import entriesRouter from './routes/entries';

const app = express();

// Define the origins you want to allow
const whitelist = [
  'http://localhost:5173',                              // local dev
  'https://daily-progress-tracker-samyak.vercel.app'    // your Vercel frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) {
      // Origin is in our whitelist
      return callback(null, true);
    }
    // Otherwise block it
    callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  }
}));

app.use(express.json());
app.use('/api/entries', entriesRouter);

app.get('/', (_req, res) => {
  res.send('🟢 Track Samyak backend is running');
});

export default app;
