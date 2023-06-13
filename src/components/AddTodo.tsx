import React from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';

interface IAddTodo {
  boardId: string;
  todos: { date: number; todo: string; example: boolean }[];
}

export default function AddTodo({ boardId, todos }: IAddTodo) {
  const setTodos = useSetRecoilState(todoState);
  const [newTodo, setNewTodo] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodo.trim().length === 0) return;
    const addTodo = [
      { date: Date.now(), todo: newTodo, example: false },
      ...todos,
    ];
    setNewTodo('');
    setTodos((prevTodos) => ({ ...prevTodos, [boardId]: addTodo }));
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewTodo(event.currentTarget.value);
  };
  return (
    <form className='todos__form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder={` Add a card in "${boardId}"`}
        value={newTodo}
        onChange={handleChange}
      />
    </form>
  );
}
