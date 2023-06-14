import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import DroppableBoard from './components/DroppableBoard';
import Header from './components/Header';
import DroppableBin from './components/DraggableBin';

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    console.log(result);

    if (!destination) return;

    //보드가 움직인다면
    if (source.droppableId === 'boards') {
      console.log(result);
      setTodos((prevTodos) => {
        const copyTodos = [...prevTodos];
        copyTodos.splice(source.index, 1);
        copyTodos.splice(destination.index, 0, prevTodos[source.index]);
        return copyTodos;
      });
      return;
    }

    
    // 같은 보드 내에서 이동한다면
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

    // 서로 다른 보드로 이동한다면
    if (source.droppableId !== destination?.droppableId) {
      //휴지통으로 이동한다면
      if (destination.droppableId === 'bin') {
        setTodos((prevTodos) => {
          return prevTodos.map((todos) => {
            if (todos.id + '' === source.droppableId) {
              const deleteTodo = todos.todos.filter(
                (value) => value.date + '' !== draggableId
              );
              return { ...todos, todos: deleteTodo };
            }
            return todos;
          });
        });
      } else {
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
    }
  };
  return (
    <>
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='boards' direction='horizontal' type='board'>
          {(provided) => (
            <section
              className='todos__container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.map((todo, index) => (
                <DroppableBoard key={todo.id} {...todo} index={index} />
              ))}
              <DroppableBin />
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
