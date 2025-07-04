import React, { useState, useEffect } from 'react';
import { ProgressEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  fetchEntries,
  createEntry as apiCreateEntry,
  updateEntry,
  deleteEntry
} from '../utils/api';
import { exportToCSV, calculateStats } from '../utils/export';
import { mockEntries } from '../data/mockData';
import SummaryCards from './SummaryCards';
import AddEntryForm from './AddEntryForm';
import EntryTable from './EntryTable';
import Toast from './Toast';

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<ProgressEntry[]>(
    'progress-entries',
    mockEntries
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({ message: '', type: 'info', isVisible: false });

  const showToast = (message: string, type: 'success' | 'error' | 'info') =>
    setToast({ message, type, isVisible: true });
  const hideToast = () => setToast(prev => ({ ...prev, isVisible: false }));

  // Load entries from API on mount
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEntries();
        setEntries(data);
      } catch (err) {
        console.error('Fetch failed, using local data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Add entry handler
  const handleAddEntry = async (
    newEntry: Omit<ProgressEntry, 'id' | 'createdAt'>
  ) => {
    setIsLoading(true);
    try {
      const saved = await apiCreateEntry(newEntry);
      setEntries(prev => [saved, ...prev]);
      showToast('Entry added successfully!', 'success');
    } catch (err) {
      console.error('Add failed:', err);
      showToast('Failed to add entry.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Update entry handler (if used)
  const handleUpdateEntry = async (
    id: string,
    updates: Partial<ProgressEntry>
  ) => {
    try {
      const updated = await updateEntry(id, updates);
      setEntries(prev => prev.map(e => (e.id === id ? updated : e)));
      showToast('Entry updated!', 'success');
    } catch (err) {
      console.error('Update failed:', err);
      showToast('Failed to update entry.', 'error');
    }
  };

  // Delete entry handler (if used)
  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteEntry(id);
      setEntries(prev => prev.filter(e => e.id !== id));
      showToast('Entry deleted!', 'info');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Failed to delete entry.', 'error');
    }
  };

  // Export CSV
  const handleExport = () => {
    try {
      exportToCSV(entries);
      showToast('Export successful!', 'success');
    } catch (err) {
      console.error('Export failed:', err);
      showToast('Failed to export data.', 'error');
    }
  };

  const stats = calculateStats(entries);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Track Samyak Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your daily progress and track your productivity journey.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards stats={stats} />

        {/* Add Entry Form */}
        <AddEntryForm onAddEntry={handleAddEntry} isLoading={isLoading} />

        {/* Entries Table with optional update/delete */}
        <EntryTable
          entries={entries}
          onExport={handleExport}
          onUpdate={handleUpdateEntry}
          onDelete={handleDeleteEntry}
          isLoading={isLoading}
        />

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </div>
  );
};

export default Dashboard;
