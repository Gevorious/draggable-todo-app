import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import './styles.scss';
import { Task, TaskBoardProps, TaskStatus } from './types';
import { groupTodosByStatus } from './helpers';
import Draggable from './_partials/Draggable';
import { Droppable } from './_partials/Droppable';
import { useEffect, useState } from 'react';

const TaskBoard = ({ data, onStatusUpdate, searchTerm }: TaskBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(data);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const idx = tasks.findIndex((task) => task.id === active.id);
    const activeTask = tasks[idx];

    if (activeTask.status === over.id) return;

    setTasks((prevTasks) => [
      ...prevTasks.slice(0, idx),
      { ...activeTask, status: over.id as TaskStatus },
      ...prevTasks.slice(idx + 1),
    ]);

    onStatusUpdate({ ...activeTask, status: over.id as TaskStatus });
  };

  const filtered = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
  );

  const { todo, in_progress, done } = groupTodosByStatus(filtered);

  return (
    <div>
      <div className="columns">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="column" data-status="todo">
            <Droppable id="todo">
              <h2>To Do</h2>
              <div className="task-list">
                {todo.map((item) => (
                  <Draggable key={item.id} {...item} />
                ))}
              </div>
            </Droppable>
          </div>

          <div className="column" data-status="in-progress">
            <Droppable id="in_progress">
              <h2>In Progress</h2>
              <div className="task-list">
                {in_progress.map((item) => (
                  <Draggable key={item.id} {...item} />
                ))}
              </div>
            </Droppable>
          </div>

          <div className="column" data-status="done">
            <Droppable id="done">
              <h2>Done</h2>
              <div className="task-list">
                {done.map((item) => (
                  <Draggable key={item.id} {...item} />
                ))}
              </div>
            </Droppable>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default TaskBoard;
