import { Task } from '@/src/components/TaskBoard/types';
import { Modal, SearchBar, TaskBoard, Form } from '@components';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { ContentProps } from '../types';

const Content = ({ data, refetch }: ContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [, update] = useAxios({ method: 'PATCH' }, { manual: true });
  const [{ loading: addLoading }, addNew] = useAxios(
    {
      url: '/tasks',
      method: 'POST',
    },
    { manual: true },
  );

  const handleUpdate = async (task: Task) => {
    await update({
      url: `/tasks/${task.id}`,
      data: task,
    });
  };

  const addNewTask = async ({ title, description }: FieldValues) => {
    await addNew({
      data: {
        title,
        description,
        status: 'todo',
      },
    });
    await refetch();
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(value: string) => setSearchTerm(value)}
        onAddNew={() => {
          setIsOpen(true);
        }}
      />
      <TaskBoard
        data={data}
        onStatusUpdate={handleUpdate}
        searchTerm={searchTerm}
      />
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Add New Task"
        content={
          <Form
            onCancel={() => {
              setIsOpen(false);
            }}
            onSubmit={addNewTask}
            loading={addLoading}
            okBtnText={'Add'}
          />
        }
      />
    </>
  );
};

export default Content;
