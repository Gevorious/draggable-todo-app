export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export type TaskBoardProps = {
  data: Task[];
  onStatusUpdate: (data: Task) => void;
  searchTerm?: string;
};
