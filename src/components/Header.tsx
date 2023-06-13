import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { todoState } from '../atoms';
export default function Header() {
  const [todos, setTodos] = useRecoilState(todoState);
  const handleCreateBoard = () => {
    const newBoard = prompt('New Board의 이름을 입력해주세요');
    if (!newBoard) return;
    setTodos((prevTodos) => {
      return { ...prevTodos, [newBoard]: [] };
    });
  };
  const handleClearExample = () => {
    Object.keys(todos).map((key) => {
      setTodos((prevTodos) => ({
        ...prevTodos,
        [key]: prevTodos[key].filter((v) => v.example !== true),
      }));
    });
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
