import { Draggable, Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import AddTodo from './AddTodo';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { RxDragHandleHorizontal } from 'react-icons/rx';
import { useSetRecoilState } from 'recoil';
import { todoState, ITodo } from '../atoms';

interface IDroppableBoardProps {
  id: number;
  title: string;
  todos: ITodo[];
  index: number;
}
export default function DroppableBoard({
  id,
  title,
  todos,
  index,
}: IDroppableBoardProps) {
  const setTodos = useSetRecoilState(todoState);

  const handleEdit = () => {
    const newTitle = prompt(`${title}를 어떤 타이틀로 변경하시겠습니까?`);
    if (newTitle?.trim().length === 0) return;
    setTodos((prevTodos) => {
      return prevTodos.map((todos) => {
        if (todos.id === id) {
          return { ...todos, title: newTitle ?? title };
        }
        return todos;
      });
    });
  };
  const handleDelete = () => {
    const isDelete = confirm(`${title} 보드를 정말 삭제하시겠습니까?`);
    if (!isDelete) return;
    setTodos((prevTodos) => prevTodos.filter((todos) => todos.id !== id));
  };

  return (
    <Draggable draggableId={id + ''} index={index}>
      {(provided, snapshot) => (
        <article
          className={`todos__article ${
            snapshot.isDragging ? 'isDragging' : null
          }`}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='todos__article-head'>
            <h2>{title}</h2>
            <div className='buttons'>
              <FiEdit onClick={handleEdit} />
              <BsFillTrash3Fill onClick={handleDelete} />
              <RxDragHandleHorizontal />
            </div>
          </div>
          <Droppable droppableId={id + ''}>
            {(provided, snapshot) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`todos__board ${
                  snapshot.isDraggingOver
                    ? 'over'
                    : snapshot.draggingFromThisWith
                    ? 'from'
                    : null
                }`}
              >
                {todos.map((todo, index) => (
                  <DraggableCard
                    key={todo.date}
                    todo={todo}
                    index={index}
                    boardId={id}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          {todos.length <= 0 && (
            <p className='todos__empty'>작성된 내용이 없습니다.</p>
          )}
          <AddTodo boardId={id} boardTitle={title} />
        </article>
      )}
    </Draggable>
  );
}
