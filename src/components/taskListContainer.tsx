import React, { useState } from "react";
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
  header: {
    textAlign: 'center',
    margin: '16px 0px',
    height: 32
  },
  containerHeader: {
    margin: '8px 0px'
  },
  taskContainer: {
    margin: '8px 0px',
    border: 'solid thin black',
    padding: '8px'
  }
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
