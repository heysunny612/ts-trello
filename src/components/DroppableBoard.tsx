import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import AddTodo from './AddTodo';
import { MdModeEditOutline } from 'react-icons/md';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';
interface IDroppableBoardProps {
  boardId: string;
  todos: { date: number; todo: string; example: boolean }[];
}

export default function DroppableBoard({
  boardId,
  todos,
}: IDroppableBoardProps) {
  const setTodos = useSetRecoilState(todoState);
  const handleEdit = () => {
    const newTitle = prompt(`${boardId}를 어떤 타이틀로 변경하시겠습니까?`);
  };
  const handleDelete = () => {
    setTodos((prevTodos) => {
      const copyTodos = { ...prevTodos };
      delete copyTodos[boardId];
      return copyTodos;
    });
  };
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <article className='todos__article'>
          <div className='todos__article-head'>
            <h2>{boardId}</h2>
            <div className='buttons'>
              <MdModeEditOutline onClick={handleEdit} />
              <BsFillTrash3Fill onClick={handleDelete} />
            </div>
          </div>
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='todos__board'
          >
            {todos.map((todo, index) => (
              <DraggableCard key={todo.date} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </ul>
          <AddTodo boardId={boardId} todos={todos} />
        </article>
      )}
    </Droppable>
  );
}
