import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import AddTodo from './AddTodo';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';
import { ItodoState } from '../atoms';

export default function DroppableBoard({ id, title, todos }: ItodoState) {
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
    <Droppable droppableId={id + ''}>
      {(provided) => (
        <article className='todos__article'>
          <div className='todos__article-head'>
            <h2>{title}</h2>
            <div className='buttons'>
              <FiEdit onClick={handleEdit} />
              <BsFillTrash3Fill onClick={handleDelete} />
            </div>
          </div>

          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='todos__board'
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
          {todos.length <= 0 && (
            <p className='todos__empty'>작성된 내용이 없습니다.</p>
          )}
          <AddTodo boardId={id} boardTitle={title} />
        </article>
      )}
    </Droppable>
  );
}
