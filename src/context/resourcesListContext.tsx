import React, { useEffect, ReactNode } from "react";
import { Resource } from "../domain/objects/subObjects/resource";
import { Board } from "../domain/board";

type ResourceListState = Resource[];
type ResourceListDispatch = (action: ResourceListAction) => void;

const ResourceListStateContext = React.createContext<ResourceListState | undefined>(undefined);
const ResourceDispatchStateContext = React.createContext<ResourceListDispatch | undefined>(undefined);

interface ResourceListProviderProps {
  board: Board;
  children: ReactNode;
}

export default function ResourceListProvider(props: ResourceListProviderProps) {
  const [resourceListState, dispatch] = React.useReducer(resourceListReducer, []);
  let { board } = props;
  useEffect(() => {
    if (board.boardName) {
      let resourceList: Resource[] = board.resources;
      dispatch({
        key: "set resources",
        payload: resourceList
      });
    }
  }, [board]);

  return (
    <ResourceListStateContext.Provider value={resourceListState}>
      {props.children}
    </ResourceListStateContext.Provider>
  );
}

export function useResourceListState() {
  const context = React.useContext(ResourceListStateContext);
  if (context === undefined) {
    throw new Error("useResourceListState must be used within a ResourcelistProvider");
  }
  return context;
}

export function useResourceListDispatch() {
  const context = React.useContext(ResourceDispatchStateContext);
  if (context === undefined) {
    throw new Error("useResourceListDispatch must be used within a ResourcelistProvider");
  }
  return context;
}

type ResourceListAction =
  | { key: "set resources"; payload: Resource[] }

function resourceListReducer(state: ResourceListState, action: ResourceListAction): Resource[] {

  if (action.key === 'set resources') {
    return action.payload;
  }
  return state;
}

