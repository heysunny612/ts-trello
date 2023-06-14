import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';
export default function Header() {
  const setTodos = useSetRecoilState(todoState);
  //새로운 보드 만들기
  const handleCreateBoard = () => {
    const newBoardTitle = prompt('New Board의 이름을 입력해주세요');
    if (!newBoardTitle) return;
    const newBoard = { id: Date.now(), title: newBoardTitle, todos: [] };
    setTodos((prevTodos) => {
      return [...prevTodos, newBoard];
    });
  };

  //예제 투두 전부 지우기
  const handleClearExample = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todoObj) => ({
        ...todoObj,
        todos: todoObj.todos.filter((value) => value.example !== true),
      }))
    );
  };

  return (
    <header className='todos__header'>
      <h1>
        <AiFillStar /> Sunny Trello
      </h1>
      <ul className='todos__header-btn'>
        <li>
          <button onClick={handleCreateBoard}>
            <AiOutlinePlus />
            Create Board
          </button>
        </li>
        <li>
          <button onClick={handleClearExample}>
            <AiOutlineMinus />
            Clear Example
          </button>
        </li>
      </ul>
    </header>
  );
}
