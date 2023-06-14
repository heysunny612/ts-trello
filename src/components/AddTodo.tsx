import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';
import { useForm } from 'react-hook-form';

interface IAddTodo {
  boardId: number;
  boardTitle: string;
}

interface IForm {
  todo: string;
}
export default function AddTodo({ boardId, boardTitle }: IAddTodo) {
  const setTodos = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    if (todo.trim().length === 0) return;
    const newTodo = { date: Date.now(), text: todo, example: false };

    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === boardId) {
          return { ...todo, todos: [newTodo, ...todo.todos] };
        }
        return todo;
      });
    });
    setValue('todo', '');
  };

  return (
    <form className='todos__form' onSubmit={handleSubmit(onValid)}>
      <input
        type='text'
        placeholder={` Add a card in "${boardTitle}"`}
        {...register('todo', { required: true })}
      />
    </form>
  );
}
