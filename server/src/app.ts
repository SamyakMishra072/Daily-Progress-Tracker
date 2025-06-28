import express from 'express';
import cors from 'cors';
import entriesRouter from './routes/entries';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // adjust if your frontend URL differs
app.use(express.json());

app.use('/api/entries', entriesRouter);

app.get('/', (_req, res) => {
  res.send('🟢 Track Samyak backend is running');
});

export default app;
