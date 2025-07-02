import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { Task } from '@components/TaskBoard/types';
import { Button, Form, Modal } from '@components';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const statuses = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

const Details = () => {
  const { id } = useParams();
  const [{ data, loading, error }, refetch] = useAxios<Task>(`/tasks/${id}`);
  const [{ loading: updateLoading }, update] = useAxios(
    { method: 'PATCH' },
    { manual: true },
  );
  const [{ loading: removeLoading }, remove] = useAxios<Task>(
    { method: 'DELETE' },
    { manual: true },
  );
  const [openModal, setOpenModal] = useState('');

  const navigate = useNavigate();

  if (loading) return <div className="task-details">Loading...</div>;
  if (error || !data)
    return <div className="task-details">Something went wrong.</div>;

  const handleUpdate = async (task: FieldValues) => {
    await update({
      url: `/tasks/${id}`,
      data: task,
    });
    await refetch();
    setOpenModal('');
  };

  const handleDelete = async () => {
    await remove({
      url: `/tasks/${id}`,
    });
    setOpenModal('');
    navigate('/', { state: { refetch: true } });
  };

  return (
    <div className="task-details">
      <div className="title">{data.title}</div>
      <div className={`status ${data.status}`}>{statuses[data.status]}</div>
      <div className="description">{data.description}</div>

      <div className="actions">
        <Button className="edit-btn" onClick={() => setOpenModal('edit')}>
          Edit
        </Button>
        <Button className="delete-btn" onClick={() => setOpenModal('delete')}>
          Delete
        </Button>
      </div>
      <Modal
        open={openModal === 'edit'}
        title={'Update task'}
        onClose={() => {
          setOpenModal('');
        }}
        content={
          <Form
            onCancel={() => {
              setOpenModal('');
            }}
            onSubmit={handleUpdate}
            loading={updateLoading}
            defaults={{ title: data.title, description: data.description }}
            okBtnText={'Update'}
          />
        }
      />
      <Modal
        open={openModal === 'delete'}
        title={'Delete Tasks'}
        onClose={() => {
          setOpenModal('');
        }}
        content={
          <div className="delete-modal-content">
            <h4>Are you sure you want to delete the following task?</h4>
            <p>
              <i>{data.title}</i>
            </p>
            <Button
              className="delete-btn"
              loading={removeLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Details;
