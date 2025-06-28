import axios from 'axios';
import { ProgressEntry } from '../types';





// ✅ Axios instance pointing to your backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// ✅ GET all progress entries
export const fetchEntries = async (): Promise<ProgressEntry[]> => {
  const response = await API.get('/entries');
  return response.data;
};

// ✅ CREATE a new entry
export const createEntry = async (
  entry: Omit<ProgressEntry, 'id' | 'createdAt'>
): Promise<ProgressEntry> => {
  const response = await API.post('/entries', entry);
  return response.data;
};

// ✅ UPDATE an entry by ID
export const updateEntry = async (
  id: string,
  entry: Partial<ProgressEntry>
): Promise<ProgressEntry> => {
  const response = await API.put(`/entries/${id}`, entry);
  return response.data;
};

// ✅ DELETE an entry by ID
export const deleteEntry = async (id: string): Promise<void> => {
  await API.delete(`/entries/${id}`);
};
