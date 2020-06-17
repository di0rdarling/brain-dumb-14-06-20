import React, { ReactElement } from "react";
import { Box } from "@material-ui/core";
import { Board } from "../domain/board";
import { useBoardState } from "./boardContext";
import TaskProvider from "./taskContext";
import NotesListProvider from "./notesListContext";
import ResourceListProvider from "./resourcesListContext";

interface GlobalBoardProviderProps {
  children: ReactElement;
}
export default function GlobalBoardProvider(props: GlobalBoardProviderProps) {
  let board: Board = useBoardState();

  return (
    <Box>
      {board && (
        <TaskProvider board={board}>
          <NotesListProvider board={board}>
            <ResourceListProvider board={board}>{props.children}</ResourceListProvider>
          </NotesListProvider>
        </TaskProvider>
      )}
    </Box>
  );
}
