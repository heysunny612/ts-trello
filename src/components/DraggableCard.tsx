import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { formatAgo } from '../utils/date';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { FaCheck } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';
import { ITodo } from '../atoms';

interface IDraggableCardProps {
  boardId: number;
  todo: ITodo;
  index: number;
}
export default function DraggableCard({
  boardId,
  todo,
  index,
}: IDraggableCardProps) {
  const { date, text, example, edit } = todo;
  const setTodos = useSetRecoilState(todoState);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);

  //삭제
  const handleDelete = () => {
    const isDelete = confirm(`[${text}] 정말 삭제하시겠습니까?`);
    if (!isDelete) return;

    setTodos((prevTodos) =>
      prevTodos.map((todoObj) =>
        todoObj.id === boardId
          ? {
              ...todoObj,
              todos: todoObj.todos.filter((value) => value.date !== date),
            }
          : todoObj
      )
    );
  };

  //수정 인풋 변경되었을때
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEditText(event.currentTarget.value);
  };

  //수정 버튼 눌렀을때
  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  //수정 전송
  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUptate();
  };
  //수정 클릭
  const handleConfirm = () => handleUptate();

  //수정된 내용 업데이트
  const handleUptate = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todoObj) => ({
        ...todoObj,
        todos: todoObj.todos.map((todo) => {
          if (todo.date === date) {
            return { ...todo, text: editText, edit: Date.now() };
          }
          return todo;
        }),
      }))
    );
    setEditMode((prev) => !prev);
  };

  return (
    <Draggable draggableId={date + ''} index={index}>
      {(provided) => (
        <li
          className={`todos__list ${editMode ? 'edit' : null}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!editMode ? (
            <label
              htmlFor={date + ''}
              className={`todos__lable ${example ? 'example' : null}`}
            >
              {text}
            </label>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                id={date + ''}
                type='text'
                value={editText}
                className='todos__edit'
                onChange={handleChange}
                autoFocus
              />
            </form>
          )}
          <p className='todos__date'>
            {edit && (
              <span className='edit'>{formatAgo(edit, 'ko')} 수정됨</span>
            )}
            <span>{formatAgo(date, 'ko')}</span>
          </p>
          <div className='buttons'>
            {!editMode ? (
              <>
                <button onClick={handleToggleEdit}>
                  <FiEdit />
                </button>
                <button onClick={handleDelete}>
                  <BsFillTrash3Fill />
                </button>
              </>
            ) : (
              <>
                <button onClick={handleConfirm}>
                  <FaCheck />
                </button>
                <button onClick={handleToggleEdit}>
                  <GrClose />
                </button>
              </>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}

React.memo(DraggableCard);
