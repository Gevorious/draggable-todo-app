import { useForm } from 'react-hook-form';
import { FormProps } from '../types';
import { Button } from '@components';

const Form = ({ onCancel, onSubmit, loading, defaults }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { title, description } = defaults || {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <div className="form-body">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: true })}
            defaultValue={title || ''}
          />

          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            {...register('description', { required: true })}
            defaultValue={description || ''}
          />
        </div>
        <div className="form-footer">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <Button type="submit" loading={loading}>
            Add Task
          </Button>
        </div>
      </>
    </form>
  );
};

export default Form;
