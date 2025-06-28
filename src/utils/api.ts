import axios from 'axios';
import { ProgressEntry } from '../types';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// ✅ Attach token from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET all progress entries
export const fetchEntries = async (): Promise<ProgressEntry[]> => {
  const { data } = await API.get<ProgressEntry[]>('/entries');
  return data;
};

// CREATE a new entry
export const createEntry = async (
  entry: Omit<ProgressEntry, 'id' | 'createdAt'>
): Promise<ProgressEntry> => {
  const { data } = await API.post<ProgressEntry>('/entries', entry);
  return data;
};

// UPDATE an existing entry
export const updateEntry = async (
  id: string,
  updates: Partial<ProgressEntry>
): Promise<ProgressEntry> => {
  const { data } = await API.put<ProgressEntry>(`/entries/${id}`, updates);
  return data;
};

// DELETE an entry
export const deleteEntry = async (id: string): Promise<void> => {
  await API.delete(`/entries/${id}`);
};
