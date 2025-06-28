import { ProgressEntry } from '../types';

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const fetchEntries = () => API.get('/entries');
export const createEntry = (data: any) => API.post('/entries', data);
export const updateEntry = (id: string, data: any) => API.put(`/entries/${id}`, data);
export const deleteEntry = (id: string) => API.delete(`/entries/${id}`);

// TODO: Replace with actual API endpoints when backend is ready
const API_BASE_URL = 'https://api.example.com';

export const api = {
  // Create a new progress entry
  createEntry: async (entry: Omit<ProgressEntry, 'id' | 'createdAt'>): Promise<ProgressEntry> => {
    try {
      // Simulate API call
      const response = await fetch(`${API_BASE_URL}/api/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to create entry');
      }

      // For now, return mock data since backend isn't ready
      return {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      // Simulate successful creation for demo purposes
      console.log('TODO: Connect to real API endpoint');
      return {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
    }
  },

  // Get all progress entries
  getEntries: async (): Promise<ProgressEntry[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/progress`);
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      return await response.json();
    } catch (error) {
      console.log('TODO: Connect to real API endpoint');
      return [];
    }
  },

  // Update an existing entry
  updateEntry: async (id: string, entry: Partial<ProgressEntry>): Promise<ProgressEntry> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/progress/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      return await response.json();
    } catch (error) {
      console.log('TODO: Connect to real API endpoint');
      throw error;
    }
  },

  // Delete an entry
  deleteEntry: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/progress/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }
    } catch (error) {
      console.log('TODO: Connect to real API endpoint');
      throw error;
    }
  },
};