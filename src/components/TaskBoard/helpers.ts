import { Task, TaskStatus } from './types';

export const groupTodosByStatus = (tasks: Task[]) => {
  const tasksByStatus: Record<TaskStatus, Task[]> = {
    todo: [],
    in_progress: [],
    done: [],
  };

  tasks.forEach((task) => {
    return tasksByStatus[task.status].push(task);
  });

  return tasksByStatus;
};
