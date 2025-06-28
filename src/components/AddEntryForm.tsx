import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { ProgressEntry } from '../types';

interface AddEntryFormProps {
  onAddEntry: (entry: Omit<ProgressEntry, 'id' | 'createdAt'>) => void;
  isLoading?: boolean;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAddEntry, isLoading = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    tasksCompleted: '',
    satisfied: '' as 'Y' | 'N' | '',
    remarks: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.tasksCompleted.trim()) {
      newErrors.tasksCompleted = 'Tasks completed is required';
    }

    if (!formData.satisfied) {
      newErrors.satisfied = 'Please select if you are satisfied';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onAddEntry({
      date: formData.date,
      tasksCompleted: formData.tasksCompleted.trim(),
      satisfied: formData.satisfied as 'Y' | 'N',
      remarks: formData.remarks.trim(),
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      tasksCompleted: '',
      satisfied: '',
      remarks: '',
    });
    setErrors({});
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      tasksCompleted: '',
      satisfied: '',
      remarks: '',
    });
    setErrors({});
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Entry
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Add New Progress Entry
        </h3>
        <button
          onClick={handleCancel}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="satisfied" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Satisfied with Tasks? *
            </label>
            <select
              id="satisfied"
              value={formData.satisfied}
              onChange={(e) => setFormData({ ...formData, satisfied: e.target.value as 'Y' | 'N' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                errors.satisfied ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select...</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
            {errors.satisfied && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.satisfied}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="tasksCompleted" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tasks Completed *
          </label>
          <textarea
            id="tasksCompleted"
            rows={4}
            placeholder="Enter each task on a new line..."
            value={formData.tasksCompleted}
            onChange={(e) => setFormData({ ...formData, tasksCompleted: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
              errors.tasksCompleted ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.tasksCompleted && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tasksCompleted}</p>}
        </div>

        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            My Remarks
          </label>
          <input
            type="text"
            id="remarks"
            placeholder="Optional notes or thoughts..."
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;