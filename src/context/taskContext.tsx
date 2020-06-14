import React, { useEffect, ReactNode } from "react";
import { Task } from "../domain/objects/subObjects/task/task";
import { Board } from "../domain/board";

type TaskListState = Task[];
const TaskListStateContext = React.createContext<TaskListState | undefined>(undefined);
const TaskDispatchContext = React.createContext<TaskDispatch | undefined>(
  undefined
);
interface TaskListProviderProps {
  board: Board;
  children: ReactNode;
}

export default function TaskListProvider(props: TaskListProviderProps) {
  const [taskListState, dispatch] = React.useReducer(taskListReducer, []);

  let { board, children } = props;
  useEffect(() => {
    if (board.boardName) {
      let taskList: Task[] = board.tasks;
      dispatch({
        key: "set tasks",
        payload: taskList
      });
    }
  }, [board]);

  return (
    <TaskListStateContext.Provider value={taskListState}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskListStateContext.Provider>
  );
}

export function useTaskListState() {
  const context = React.useContext(TaskListStateContext);
  if (context === undefined) {
    throw new Error("useTaskListState must be used within a TaskListProvider");
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

type TaskListAction =
  | { key: "set tasks"; payload: Task[] }
  | { key: "update tasks"; payload: Task[] }
  | { key: "update task"; payload: { taskId: number; key: keyof Task; value: any } };

type TaskDispatch = (action: TaskListAction) => void;

function taskListReducer(state: TaskListState, action: TaskListAction): Task[] {
  switch (action.key) {
    case "set tasks":
      return action.payload;
    case "update tasks":
      return action.payload;
    case "update task":
      return updateTask(state, action.payload.taskId, action.payload.key, action.payload.value)
  }
}

function updateTask(state: TaskListState, id: number, key: keyof Task, value: any) {

  let index = state.findIndex(task => task.id === id)
  let task = state[index];
  let updatedTask = { ...task, [key]: value }
  state.splice(index, 1);
  return [...state, updatedTask];
}
