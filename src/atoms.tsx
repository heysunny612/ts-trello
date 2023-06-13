import { atom } from 'recoil';

export interface ItodoState {
  [key: string]: { date: number; todo: string; example: boolean }[];
}

export const todoState = atom<ItodoState>({
  key: 'todos',
  default: {
    'To do': [
      {
        date: 1686667627455,
        todo: '리액트 Sunny Trello : CREATE BOARD 구현',
        example: true,
      },
      {
        date: 1686667624557,
        todo: '리액트 제로베이스 미션 제출하기',
        example: true,
      },
      {
        date: 1686667667521,
        todo: '프로그래머스 코딩테스트 문제풀이',
        example: true,
      },
    ],
    Doing: [
      {
        date: 1686667645875,
        todo: '리액트 Sunny Trello : Add a card 구현',
        example: true,
      },
      {
        date: 1686667645657,
        todo: '블로그 React-query, Recoil 업로드',
        example: true,
      },
    ],
    Done: [
      {
        date: 1686667624564,
        todo: '블로그 Lifecycle, useEffect 업로드',
        example: true,
      },
      {
        date: 1686645624558,
        todo: 'Sunny 포트폴리오: Work페이지 구현',
        example: true,
      },
      { date: 1686455615455, todo: '프로그래머스 코딩 테스트', example: true },
    ],
  },
});
