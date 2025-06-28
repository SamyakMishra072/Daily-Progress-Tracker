import { Router } from 'express';
import {
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry
} from '../controllers/entriesController';

const router = Router();

router.get('/', getAllEntries);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

export default router;
