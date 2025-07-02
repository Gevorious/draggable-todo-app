import { Task } from '@/src/components/TaskBoard/types';
import { AxiosResponse } from 'axios';

export type ContentProps = {
  data: Task[];
  refetch: () => Promise<AxiosResponse<Task[]>>;
  setFiltered: (data: Task[]) => void;
};
