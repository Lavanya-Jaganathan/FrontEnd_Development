export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  category: 'work' | 'personal' | 'health' | 'other';
  priority: 'low' | 'medium' | 'high';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'health' | 'other';
}