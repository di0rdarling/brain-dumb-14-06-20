import React from "react";
import {
  Box,
  makeStyles,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import {
  useBoardState,
  useBoardDispatch,
  BoardDispatch
} from "../context/boardContext";
import { Board } from "../domain/board";
import ObjectListContainer from './common/objectListContainer';
import { ObjectType } from "../domain/objects/subObjects/objectType";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#5E6472',
    height: '100vh'
  },
  boardHeader: {
    textAlign: 'center',
    margin: '16px 0px',
    color: 'white',
    padding: '16px 0px 56px 0px'
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
      <Box className={classes.root}>
        <Box className={classes.boardHeader}>
          <Typography variant='h2'>{board.boardName}</Typography>
          <Typography>Created by {board.boardCreatedByUser}</Typography>
        </Box>
        <Box className={classes.objectsWrapper}>
          <Box className={classes.objectListContainer}>
            <ObjectListContainer objectType={ObjectType.TASK} />
          </Box>
          <Box className={classes.objectListContainer}>
            <ObjectListContainer objectType={ObjectType.NOTE} />
          </Box>
          <Box className={classes.objectListContainer}>
            <ObjectListContainer objectType={ObjectType.RESOURCE} />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <h1>No board Found</h1>;
  }
}
