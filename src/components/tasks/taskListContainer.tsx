import React, { useState } from "react";
import { useTaskListState } from "../../context/taskContext";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Task } from "../../domain/objects/subObjects/task/task";
import { useBoardDispatch } from "../../context/boardContext";
import TaskContainer from './taskContainer';
import { ObjectType } from "../../domain/objects/subObjects/objectType";

const useStyles = makeStyles({
  root: {
    padding: 8,
    margin: 8
  },
  header: {
    textAlign: 'center',
    margin: '16px 0px',
    height: 32
  },
})

export default function TaskListContainer() {
  let classes = useStyles()
  let [creatingTask, setCreatingTask] = useState<boolean>(false)
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
      createdDateTime: new Date().toISOString(),
      content: 'this is created task content.'
    }
    boardDispatch({
      key: 'create object',
      payload: {
        objectType: ObjectType.TASK,
        object: task
      }
    })
  }

  return (
    <Box className={classes.root} component={Paper}>
      <Box className={classes.header}>
        <Typography variant='h5'>Tasks</Typography>
      </Box>
      {!creatingTask ? (
        <Button onClick={() => setCreatingTask(true)}>Create task</Button>
      ) : (
          <Box>
            <TextField onChange={handNewTaskInput} />
            <Button onClick={() => createTask()}>CREATE</Button>
          </Box>
        )}

      {tasks && (
        <Box>
          {tasks.map((task, index) => (
            <TaskContainer key={index} task={task} />
          ))}
        </Box>
      )}
    </Box>
  );
}
