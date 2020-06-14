import React, { useEffect, ReactNode } from "react";
import { Note } from "../domain/objects/subObjects/note";
import BoardMapper from "../domain/mappers/boardMapper";
import { Board } from "../domain/board";

type NoteState = Note;

const NoteStateContext = React.createContext<NoteState | undefined>(undefined);
const NoteDispatchContext = React.createContext<NoteDispatch | undefined>(
  undefined
);
interface NoteProviderProps {
  board: Board;
  children: ReactNode;
}

export default function NoteProvider(props: NoteProviderProps) {
  const [noteState, dispatch] = React.useReducer(postReducer, {} as Note);
  let { board, children } = props;
  useEffect(() => {
    if (board.boardName) {
      let note: Note = BoardMapper.mapToNoteModel(board);
      dispatch({
        key: "set note",
        payload: note
      });
    }
  }, [board]);

  return (
    <NoteStateContext.Provider value={noteState}>
      <NoteDispatchContext.Provider value={dispatch}>
        {children}
      </NoteDispatchContext.Provider>
    </NoteStateContext.Provider>
  );
}

export function useNoteState() {
  const context = React.useContext(NoteStateContext);
  if (context === undefined) {
    throw new Error("useNoteState must be used within a NoteProvider");
  }
  return context;
}

export function useNoteDispatch() {
  const context = React.useContext(NoteDispatchContext);
  if (context === undefined) {
    throw new Error("useNoteDispatch must be used within a NoteProvider");
  }
  return context;
}

type NoteAction =
  | { key: "set note"; payload: Note }
  | { key: "update note"; payload: { key: keyof Note; payload: any } };

type NoteDispatch = (action: NoteAction) => void;

function postReducer(state: NoteState, action: NoteAction): Note {
  switch (action.key) {
    case "set note":
      return action.payload;
    case "update note":
      return { ...state, [action.payload.key]: action.payload.payload };
  }
}
