import { ProgressEntry } from '../types';

export const mockEntries: ProgressEntry[] = [
  {
    id: '1',
    date: '2024-01-15',
    tasksCompleted: 'Completed React dashboard\nFinished API integration\nWritten unit tests',
    satisfied: 'Y',
    remarks: 'Great progress today, feeling productive!',
    createdAt: '2024-01-15T18:30:00Z',
  },
  {
    id: '2',
    date: '2024-01-14',
    tasksCompleted: 'Reviewed code\nAttended team meeting\nFixed critical bug',
    satisfied: 'Y',
    remarks: 'Solid day, team collaboration was excellent.',
    createdAt: '2024-01-14T17:45:00Z',
  },
  {
    id: '3',
    date: '2024-01-13',
    tasksCompleted: 'Started new feature\nResearched design patterns',
    satisfied: 'N',
    remarks: 'Struggled with the new architecture, need more time.',
    createdAt: '2024-01-13T16:20:00Z',
  },
  {
    id: '4',
    date: '2024-01-12',
    tasksCompleted: 'Database optimization\nPerformance testing\nDocumentation updates',
    satisfied: 'Y',
    remarks: 'Good day, significant performance improvements achieved.',
    createdAt: '2024-01-12T19:10:00Z',
  },
];