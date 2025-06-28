import { ProgressEntry } from '../types';

export const exportToCSV = (entries: ProgressEntry[]) => {
  const headers = ['Date', 'Tasks Completed', 'Satisfied', 'Remarks'];
  const csvContent = [
    headers.join(','),
    ...entries.map(entry => [
      entry.date,
      `"${entry.tasksCompleted.replace(/"/g, '""')}"`,
      entry.satisfied,
      `"${entry.remarks.replace(/"/g, '""')}"`,
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `track-samyak-progress-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const calculateStats = (entries: ProgressEntry[]) => {
  const totalEntries = entries.length;
  const satisfiedCount = entries.filter(entry => entry.satisfied === 'Y').length;
  const satisfiedPercentage = totalEntries > 0 ? Math.round((satisfiedCount / totalEntries) * 100) : 0;

  // Calculate current streak
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let currentStreak = 0;
  for (const entry of sortedEntries) {
    if (entry.satisfied === 'Y') {
      currentStreak++;
    } else {
      break;
    }
  }

  const averageTasksPerDay = totalEntries > 0 ? 
    Math.round(entries.reduce((sum, entry) => sum + entry.tasksCompleted.split('\n').filter(task => task.trim()).length, 0) / totalEntries) : 0;

  return {
    totalEntries,
    satisfiedPercentage,
    currentStreak,
    averageTasksPerDay,
  };
};