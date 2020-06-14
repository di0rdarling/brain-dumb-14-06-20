import React from "react";
import { useTaskListState } from "../context/taskContext";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Task } from "../domain/objects/subObjects/task/task";
import { useBoardDispatch } from "../context/boardContext";
import { ObjectType } from "../domain/objects/subObjects/objectType";
import classes from "*.module.css";

const useStyles = makeStyles({
  root: {
    padding: 8,
    margin: 8
  },
  containerHeader: {
    margin: '8px 0px'
  },
  taskContainer: {
    margin: '8px 0px',
    border: 'solid thin black'

  }
})

export default function TaskListContainer() {
  let classes = useStyles()
  let tasks: Task[] = useTaskListState();
  let boardDispatch = useBoardDispatch()
  let newTask = '';

  const handNewTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    newTask = event.target.value;
  }

  const createTask = () => {

    let task: Task = {
      id: 3,
      createdAuthor: 'test created author',
      tag: newTask,
      objectType: ObjectType.TASK,
      content: 'this is created task content.'
    }
    boardDispatch({
      key: 'create task',
      payload: { task }
    })
  }

  return (
    <Box className={classes.root} component={Paper}>
      <Typography className={classes.containerHeader} variant='h5'>Tasks</Typography>
      <TextField onChange={handNewTaskInput} />
      <Button onClick={() => createTask()}>CREATE</Button>
      {tasks && (
        <Box>
          {tasks.map(task => (
            <Box className={classes.taskContainer}>
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
