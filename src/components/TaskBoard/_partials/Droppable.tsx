import { useDroppable } from '@dnd-kit/core';

export const Droppable = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="droppable-container">
      {children}
    </div>
  );
};
