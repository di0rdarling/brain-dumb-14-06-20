import React, { useEffect, ReactNode } from "react";
import { getBoard } from "../integration/boardStore";
import { Board } from "../domain/board";
import { Task } from "../domain/objects/subObjects/task/task";
import { Post } from "../domain/objects/subObjects/post";
import { Note } from "../domain/objects/subObjects/note";
import { ObjectType } from "../domain/objects/subObjects/objectType";
import { Tag } from "../domain/objects/tag";
import TaskContainer from "../components/tasks/taskContainer";

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
  | { key: "create object"; payload: { objectType: ObjectType; object: any } }
  | { key: "add tag"; payload: { objectType: ObjectType; objectId: number; tag: Tag } }

export type BoardDispatch = (action: BoardAction) => void;

function boardReducer(state: BoardState, action: BoardAction): Board {

  switch (action.key) {
    case "set board":
      return action.payload;
    case "update board":
      return { ...state, [action.payload.key]: action.payload.payload }
    case 'create object':
      return createObject(state, action.payload.objectType, action.payload.object);
    case 'add tag':
      return addTagToObject(state, action.payload.objectType, action.payload.objectId, action.payload.tag)
    default:
      return state;
  }
}


function createObject(board: Board, objectType: ObjectType, object: any) {

  switch (objectType) {
    case ObjectType.TASK:
      let boardNotes: Task[] = [...board.tasks, object]
      return { ...board, tasks: boardNotes }
    case ObjectType.NOTE:
      let boardTasks: Note[] = [...board.notes, object]
      return { ...board, notes: boardTasks }
    case ObjectType.POST:
      let boardPosts: Post[] = [...board.posts, object]
      return { ...board, posts: boardPosts }
  }
}

function addTagToObject(board: Board, objectType: ObjectType, objectId: number, tag: Tag) {
  switch (objectType) {
    case ObjectType.TASK:
      board.tasks.map(task => {
        if (task.id === objectId) {
          task.tags ?
            task.tags = [...task.tags, tag]
            :
            task.tags = [tag];
        }
      })
      break;
    case ObjectType.POST:
      board.posts.map(post => {
        if (post.id === objectId) {
          post.tags ?
            post.tags = [...post.tags, tag]
            :
            post.tags = [tag];
        }
      })
      break;
    case ObjectType.NOTE:
      board.notes.map(note => {
        if (note.id === objectId) {
          note.tags ?
            note.tags = [...note.tags, tag]
            :
            note.tags = [tag];
        }
      })
      break;

  }

  return { ...board }

}

function updateNote(board: Board, editedNote: Note) {
  let index = board.notes.findIndex(note => note.id === editedNote.id)
  board.notes.splice(index, 1);
  board.notes.push(editedNote);
  return board;
}
