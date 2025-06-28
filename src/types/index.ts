export interface ProgressEntry {
  id: string;
  date: string;
  tasksCompleted: string;
  satisfied: 'Y' | 'N';
  remarks: string;
  createdAt: string;
}

export interface DashboardStats {
  totalEntries: number;
  satisfiedPercentage: number;
  currentStreak: number;
  averageTasksPerDay: number;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}