export interface Task {
  id: number;
  text: string;
  done: boolean;
  dueDate?: string;
}

export type Filter = 'all' | 'active' | 'completed';
