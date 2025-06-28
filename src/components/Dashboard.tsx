import React, { useState, useEffect } from 'react';
import { ProgressEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { api } from '../utils/api';
import { exportToCSV, calculateStats } from '../utils/export';
import { mockEntries } from '../data/mockData';
import SummaryCards from './SummaryCards';
import AddEntryForm from './AddEntryForm';
import EntryTable from './EntryTable';
import Toast from './Toast';

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<ProgressEntry[]>('progress-entries', mockEntries);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddEntry = async (newEntry: Omit<ProgressEntry, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      const savedEntry = await api.createEntry(newEntry);
      setEntries(prev => [savedEntry, ...prev]);
      showToast('Entry added successfully!', 'success');
    } catch (error) {
      console.error('Failed to add entry:', error);
      showToast('Failed to add entry. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    try {
      exportToCSV(entries);
      showToast('Data exported successfully!', 'success');
    } catch (error) {
      console.error('Failed to export data:', error);
      showToast('Failed to export data. Please try again.', 'error');
    }
  };

  const stats = calculateStats(entries);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
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

        {/* Entries Table */}
        <EntryTable entries={entries} onExport={handleExport} />

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