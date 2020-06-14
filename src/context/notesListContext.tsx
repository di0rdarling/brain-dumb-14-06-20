import React, { useEffect, ReactNode } from "react";
import { Note } from "../domain/objects/subObjects/note";
import { Board } from "../domain/board";

type NotesListState = Note[];

const NotesListStateContext = React.createContext<NotesListState | undefined>(undefined);
const NoteDispatchContext = React.createContext<NoteDispatch | undefined>(
  undefined
);
interface NotesListProviderProps {
  board: Board;
  children: ReactNode;
}

export default function NotesListProvider(props: NotesListProviderProps) {
  const [noteslistState, dispatch] = React.useReducer(notesListReducer, []);
  let { board, children } = props;
  useEffect(() => {
    if (board.boardName) {
      let notesList: Note[] = board.notes;
      dispatch({
        key: "set notes",
        payload: notesList
      });
    }
  }, [board]);

  return (
    <NotesListStateContext.Provider value={noteslistState}>
      <NoteDispatchContext.Provider value={dispatch}>
        {children}
      </NoteDispatchContext.Provider>
    </NotesListStateContext.Provider>
  );
}

export function useNoteListState() {
  const context = React.useContext(NotesListStateContext);
  if (context === undefined) {
    throw new Error("useNoteListState must be used within a NotesListProvider");
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

type NoteListAction =
  | { key: "set notes"; payload: Note[] }
  | { key: "update notes"; payload: Note[] }
  | { key: "update note"; payload: { noteId: number; key: keyof Note; value: any } };

type NoteDispatch = (action: NoteListAction) => void;

function notesListReducer(state: NotesListState, action: NoteListAction): Note[] {
  switch (action.key) {
    case "set notes":
      return action.payload;
    case "update notes":
      return action.payload;
    case "update note":
      return updateNote(state, action.payload.noteId, action.payload.key, action.payload.value)
  }
}

function updateNote(state: NotesListState, id: number, key: keyof Note, value: any) {

  let index = state.findIndex(note => note.id === id)
  let note = state[index];
  let updatedNote = { ...note, [key]: value }
  state.splice(index, 1);
  return [...state, updatedNote];
}
