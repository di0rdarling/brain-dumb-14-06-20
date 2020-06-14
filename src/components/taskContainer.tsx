import React from "react";
import { useTaskState } from "../context/taskContext";
import { Box, Typography } from "@material-ui/core";

export default function TaskContainer() {
  let task = useTaskState();

  return (
    <Box>
      <Typography>{task.subObjectDisplayValue}</Typography>
      <Typography>Tag: {task.tag}</Typography>
      {task.taskLinks && (
        <Box>
          <Typography>Task: {task.taskLinks[0].task}</Typography>
          <Typography>Task link: {task.taskLinks[0].taskContent}</Typography>
        </Box>
      )}
    </Box>
  );
}
