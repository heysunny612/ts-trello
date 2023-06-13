import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DroppableBoard from './components/DroppableBoard';
import Header from './components/Header';

function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    // same board movement
    if (source.droppableId === destination?.droppableId) {
      setTodos((prevBoards) => {
        const boardCopy = [...prevBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(
          destination.index,
          0,
          todos[source.droppableId][source.index]
        );
        return { ...prevBoards, [source.droppableId]: boardCopy };
      });
    } else {
      // cross board movement
      setTodos((prevBoards) => {
        const sourceBoard = [...prevBoards[source.droppableId]];
        const destinationBoard = [...prevBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(
          destination.index,
          0,
          todos[source.droppableId][source.index]
        );
        return {
          ...prevBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className='todos__container'>
          {Object.keys(todos).map((key) => (
            <DroppableBoard key={key} boardId={key} todos={todos[key]} />
          ))}
        </section>
      </DragDropContext>
    </>
  );
}

export default App;
