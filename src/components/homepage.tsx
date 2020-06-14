import React from "react";
import {
  Box,
  makeStyles,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import TaskListContainer from "./taskListContainer";
import PostListContainer from "./postListContainer";
import NotesListContainer from "./notes/notesListContainer";
import {
  useBoardState,
  useBoardDispatch,
  BoardDispatch
} from "../context/boardContext";
import { Board } from "../domain/board";

const useStyles = makeStyles({
  boardHeader: {
    textAlign: 'center',
    margin: '16px 0px'
  },
  objectsWrapper: {
    display: 'flex',
  },
  objectListContainer: {
    minWidth: '33%'
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
        <Box className={classes.boardHeader}>
          <Typography variant='h2'>{board.boardName}</Typography>
          <Typography>Created by {board.boardCreatedByUser}</Typography>
        </Box>
        <TextField
          onChange={handleBoardNameInputChange}
        />
        <Button onClick={() => updateName()}>UPDATE NAME</Button>
        <Box className={classes.objectsWrapper}>
          <Box className={classes.objectListContainer}>
            <NotesListContainer />
          </Box>
          <Box className={classes.objectListContainer}>
            <TaskListContainer />
          </Box>
          <Box className={classes.objectListContainer}>
            <PostListContainer />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <h1>No board Found</h1>;
  }
}
