import { atom, AtomEffect } from 'recoil';

export interface ItodoState {
  id: number;
  title: string;
  todos: ITodo[];
}
export interface ITodo {
  date: number;
  text: string;
  example: boolean;
  edit?: number;
}

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

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
