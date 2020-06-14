import React from "react";
import { useTaskListState } from "../context/taskContext";
import { Box, Typography } from "@material-ui/core";
import { Task } from "../domain/objects/subObjects/task/task";

export default function TaskContainer() {
  let tasks: Task[] = useTaskListState();

  return (
    <Box>
      {tasks && (
        <Box>
          {tasks.map(task => (
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

          ))}
        </Box>
      )}
    </Box>
  );
}
