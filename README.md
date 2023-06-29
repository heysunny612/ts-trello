# 리액트 프로젝트 TO-DO TRELLO 만들기 

<p align="center">
    <img src="https://github.com/heysunny612/ts-trello/assets/127499117/9e6da0b2-4cff-4864-b02f-6e0bdefe20fc" alt="1">
</p>

<br/>

## Beautiful-dnd를 이용한 드래그 이벤트 구현 

 <br/>

```js
//내가 만든 자료구조가 배열안에 객체 안에 배열이 있던 구조라 조금 복잡하게 코드가 구현됐다...!
//끊임없이 공부해서..! 이 코드를 예쁘게 리팩토링 하고싶다!

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



```

<br/>
<br/>

<p align="center">
    <img src="https://github.com/heysunny612/ts-trello/assets/127499117/acb71b62-9676-4434-bcf0-99b64b838e74" alt="2">
</p>

<br/>

## recoil을 사용한 데이터 관리 및 CRUD 구현

```js
 //예제로 만들어 둔 데이터 구조 
export const todoState = atom<ItodoState[]>({
  key: 'todos',
  default: [
    {
      id: 1111,
      title: 'TO DO',
      todos: [
        {
          date: 1686667624558,
          text: '리액트 Sunny Trello : CREATE BOARD 구현',
          example: true,
          edit: 1686727648888,
        },
        {
          date: 1686667624557,
          text: '리액트 제로베이스 미션 제출하기',
          example: true,
        },
        {
          date: 1686667667521,
          text: '프로그래머스 코딩테스트 문제풀이',
          example: true,
        },
      ],
    },
    {
      id: 2222,
      title: 'DOING',
      todos: [
        {
          date: 1686667645875,
          text: '리액트 Sunny Trello : Add a card 구현',
          example: true,
        },
        {
          date: 1686667645657,
          text: '블로그 React-query, Recoil 업로드',
          example: true,
          edit: 1686727647143,
        },
      ],
    },
    {
      id: 3333,
      title: 'DONE',
      todos: [
        {
          date: 1686667624564,
          text: '블로그 Lifecycle, useEffect 업로드',
          example: true,
          edit: 1686727649999,
        },
        {
          date: 1686645624558,
          text: 'Sunny 포트폴리오: Work페이지 구현',
          example: true,
        },
        {
          date: 1686455615455,
          text: '프로그래머스 코딩 테스트',
          example: true,
        },
      ],
    },
  ],
  effects: [localStorageEffect('todos')],
});
```

<br/>

| 제목 | 설명 |
| --- | --- |
| 구현 사항 | -레코일을 이용한 투두 데이터 관리  <br/> -CRUD 구현 <br/> -Beautiful-dnd를 이용한 드래그 이벤트 구현|
| 라이브러리 | react-beautiful-dnd, recoil, react-hook-form, styled-components, timeago.js|
| css 및 반응형  | Styled-components사용 , 반응형 구현 , 타입스크립트 적용 |
| 배포 주소  | Netlify https://sunny-trello.netlify.app/ |
| 소스 코드  | Github https://github.com/heysunny612/ts-trello|


