import React, { useEffect, ReactNode } from "react";
import { getBoard } from "../integration/boardStore";
import { Board } from "../domain/board";
import { Task } from "../domain/objects/subObjects/task/task";
import { Post } from "../domain/objects/subObjects/post";
import { Note } from "../domain/objects/subObjects/note";

type BoardState = Board;

const BoardStateContext = React.createContext<Board>({} as BoardState);
const BoardDispatchContext = React.createContext<BoardDispatch>(
  {} as BoardDispatch
);

interface BoardProviderProps {
  children: ReactNode;
}

export default function BoardProvider(props: BoardProviderProps) {
  const [boardState, dispatch] = React.useReducer(boardReducer, {} as Board);

  let { children } = props;
  useEffect(() => {
    let board: Board = getBoard();
    dispatch({
      key: "set board",
      payload: board
    });
  }, []);

  return (
    <BoardStateContext.Provider value={boardState}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}

export function useBoardState() {
  const context = React.useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error("useBoardState must be used within a BoardProvider");
  }
  return context;
}

export function useBoardDispatch() {
  const context = React.useContext(BoardDispatchContext);
  if (context === undefined) {
    throw new Error("useBoardDispatch must be used within a BoardProvider");
  }
  return context;
}

export function useBoard() {
  return [useBoardState(), useBoardDispatch()];
}

type BoardAction =
  | { key: "set board"; payload: Board }
  | { key: "update board"; payload: { key: keyof Board; payload: any } }
  | { key: "create task"; payload: { task: Task } }
  | { key: "create post"; payload: { post: Post } }
  | { key: "create note"; payload: { note: Note } }

export type BoardDispatch = (action: BoardAction) => void;

function boardReducer(state: BoardState, action: BoardAction): Board {
  switch (action.key) {
    case "set board":
      return action.payload;
    case "update board":
      return { ...state, [action.payload.key]: action.payload.payload }
    case 'create task':
      return createTask(state, action.payload.task);
    case 'create post':
      return createPost(state, action.payload.post);
    case 'create note':
      return createNote(state, action.payload.note);
  }
}

function createTask(board: Board, createTask: Task) {
  let boardNotes: Task[] = [...board.tasks, createTask]
  return { ...board, tasks: boardNotes }
}

function createPost(board: Board, createPost: Post) {
  let boardPosts: Post[] = [...board.posts, createPost]
  return { ...board, posts: boardPosts }
}

function createNote(board: Board, createNote: Note) {
  let boardNotes: Note[] = [...board.notes, createNote]
  return { ...board, notes: boardNotes }
}
