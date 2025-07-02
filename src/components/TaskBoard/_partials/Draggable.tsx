import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';

const Draggable = ({ id, title, status }: Task) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div className="task-card" ref={setNodeRef} style={style}>
      <div className="drag-zone" {...listeners} {...attributes}>
        <FaGripLines size={16} />
      </div>
      <div className="content-zone">
        <Link to={`/details/${id}`} className="task-title">
          {title}
        </Link>
      </div>
    </div>
  );
};

export default Draggable;
