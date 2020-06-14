import React from "react";
import {
  Box,
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";
import TaskContainer from "./taskContainer";
import PostContainer from "./postContainer";
import NoteContainer from "./noteContainer";
import {
  useBoardState,
  useBoardDispatch,
  BoardDispatch
} from "../context/boardContext";
import { Board } from "../domain/board";

const useStyles = makeStyles({
  objectsWrapper: {
    display: 'flex'
  }
});

export default function Homepage() {
  let classes = useStyles();
  let board: Board = useBoardState()
  let boardDispatch: BoardDispatch = useBoardDispatch()
  let boardName = '';

  const handleBoardNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    boardName = event.target.value
  }

  const updateName = () => {
    boardDispatch({
      key: 'update board',
      payload: {
        key: 'boardName',
        payload: boardName
      }
    })
  }

  if (board.boardName) {
    return (
      <Box>
        <h1>{board.boardName}</h1>
        <TextField
          onChange={handleBoardNameInputChange}
        />
        <Button onClick={() => updateName()}>UPDATE NAME</Button>
        <h2>{board.boardCreatedByUser}</h2>
        <Box className={classes.objectsWrapper}>
          <NoteContainer />
          <TaskContainer />
          <PostContainer />
        </Box>
      </Box>
    );
  } else {
    return <h1>No board Found</h1>;
  }
}
