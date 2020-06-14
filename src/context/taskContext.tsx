import React, { useEffect, ReactNode } from "react";
import { Task } from "../domain/objects/subObjects/task/task";
import BoardMapper from "../domain/mappers/boardMapper";
import { Board } from "../domain/board";

type TaskState = Task;
const TaskStateContext = React.createContext<TaskState | undefined>(undefined);
const TaskDispatchContext = React.createContext<TaskDispatch | undefined>(
  undefined
);
interface TaskProviderProps {
  board: Board;
  children: ReactNode;
}

export default function TaskProvider(props: TaskProviderProps) {
  const [taskState, dispatch] = React.useReducer(tasksReducer, {} as Task);

  let { board, children } = props;
  useEffect(() => {
    if (board.boardName) {
      let task: Task = BoardMapper.mapToTaskModel(board);
      dispatch({
        key: "set task",
        payload: task
      });
    }
  }, [board]);

  return (
    <TaskStateContext.Provider value={taskState}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  const context = React.useContext(TaskStateContext);
  if (context === undefined) {
    throw new Error("useTaskState must be used within a TaskProvider");
  }
  return context;
}

export function useTaskDispatch() {
  const context = React.useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within a TaskProvider");
  }
  return context;
}

type TaskAction =
  | { key: "set task"; payload: Task }
  | { key: "update task"; payload: { key: keyof Task; payload: any } };

type TaskDispatch = (action: TaskAction) => void;

function tasksReducer(state: TaskState, action: TaskAction): Task {
  switch (action.key) {
    case "set task":
      return action.payload;
    case "update task":
      return { ...state, [action.payload.key]: action.payload.payload };
  }
}
