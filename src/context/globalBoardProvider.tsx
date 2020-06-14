import React, { ReactElement } from "react";
import { Box } from "@material-ui/core";
import { Board } from "../domain/board";
import { useBoardState } from "./boardContext";
import TaskProvider from "./taskContext";
import NoteProvider from "./noteContext";
import PostProvider from "./postContext";

interface GlobalBoardProviderProps {
  children: ReactElement;
}
export default function GlobalBoardProvider(props: GlobalBoardProviderProps) {
  let board: Board = useBoardState();;

  return (
    <Box>
      {board && (
        <TaskProvider board={board}>
          <NoteProvider board={board}>
            <PostProvider board={board}>{props.children}</PostProvider>
          </NoteProvider>
        </TaskProvider>
      )}
    </Box>
  );
}
