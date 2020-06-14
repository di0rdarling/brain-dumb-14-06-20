import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
  makeStyles
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
import TaskProvider from "../context/taskContext";
import PostProvider from "../context/postContext";
import { ObjectType } from "../domain/objects/subObjects/objectType";

const useStyles = makeStyles({
  formControl: {
    margin: 16,
    minWidth: 120
  }
});

export default function Homepage() {
  let board: Board;
  let boardDispatch: BoardDispatch;
  let classes = useStyles();

  try {
    board = useBoardState();
  } catch {
    return null;
  }

  try {
    boardDispatch = useBoardDispatch();
  } catch {
    return null;
  }

  const handleSubTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    // boardDispatch({
    //   key: "update board",
    //   payload: {
    //     key: "subObjectType",
    //     payload: event.target.value as SubObjectTypes
    //   }
    // });
  };

  if (board.boardName) {
    return (
      <Box>
        <h1>{board.boardName}</h1>
        <h2>{board.boardCreatedByUser}</h2>
        {/* <FormControl className={classes.formControl}>
          <InputLabel>Object type</InputLabel>
          <Select value={board.subObjectType} onChange={handleSubTypeChange}>
            {Object.keys(SubObjectTypes).map(sot => (
              <MenuItem value={sot}>{sot}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <NoteContainer />
        <TaskContainer />
        <PostContainer />
      </Box>
    );
  } else {
    return <h1>No board Found</h1>;
  }
}
