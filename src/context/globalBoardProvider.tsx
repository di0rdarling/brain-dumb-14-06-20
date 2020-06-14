import React, { ReactElement } from "react";
import { Box } from "@material-ui/core";
import { Board } from "../domain/board";
import { useBoardState } from "./boardContext";
import TaskProvider from "./taskContext";
import NotesListProvider from "./notesListContext";
import PostListProvider from "./postListContext";

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
            <PostListProvider board={board}>{props.children}</PostListProvider>
          </NotesListProvider>
        </TaskProvider>
      )}
    </Box>
  );
}
