import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { formatAgo } from '../utils/date';

interface IDraggableCardProps {
  todo: { date: number; todo: string; example: boolean };
  index: number;
}

export default function DraggableCard({ todo, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={todo.todo} index={index}>
      {(provided) => (
        <li
          className={todo.example ? 'todos__list example' : 'todos__list'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todo.todo}
          <p className='todos__date'>
            <span>{formatAgo(todo.date, 'ko')}</span>
          </p>
        </li>
      )}
    </Draggable>
  );
}

React.memo(DraggableCard);
