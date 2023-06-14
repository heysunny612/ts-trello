import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DroppableBoard from './components/DroppableBoard';
import Header from './components/Header';

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(result);

    if (!destination) return;
    // same board movement
    if (source.droppableId === destination?.droppableId) {
      setTodos((prevTodos) => {
        const todosIdx = prevTodos.findIndex(
          (todo) => todo.id + '' === source.droppableId
        );
        const copyTodos = [...prevTodos[todosIdx].todos];
        const todoObj = copyTodos[source.index];
        copyTodos.splice(source.index, 1);
        copyTodos.splice(destination.index, 0, todoObj);

        return prevTodos.map((todos) => {
          if (todos.id + '' === source.droppableId) {
            return { ...todos, todos: copyTodos };
          }
          return todos;
        });
      });
    }

    if (source.droppableId !== destination?.droppableId) {
      // cross board movement
      setTodos((prevTodos) => {
        const todosIdx = prevTodos.findIndex(
          (todo) => todo.id + '' === source.droppableId
        );
        const copyTodos = [...todos[todosIdx].todos];
        const todoObj = copyTodos[source.index];
        const targetIdx = prevTodos.findIndex(
          (todo) => todo.id + '' === destination.droppableId
        );
        const copyTarget = [...todos[targetIdx].todos];
        copyTodos.splice(source.index, 1);
        copyTarget.splice(destination.index, 0, todoObj);

        return prevTodos.map((todos) => {
          if (todos.id + '' === source.droppableId) {
            return { ...todos, todos: copyTodos };
          } else if (todos.id + '' === destination.droppableId) {
            return { ...todos, todos: copyTarget };
          }
          return todos;
        });
      });
    }
  };

  return (
    <>
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className='todos__container'>
          {todos.map((todo) => (
            <DroppableBoard key={todo.id} {...todo} />
          ))}
        </section>
      </DragDropContext>
    </>
  );
}

export default App;
