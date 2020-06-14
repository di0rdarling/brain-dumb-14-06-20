import React, { useEffect, ReactNode } from "react";
import { Post } from "../domain/objects/subObjects/post";
import BoardMapper from "../domain/mappers/boardMapper";
import { Board } from "../domain/board";

type PostState = Post;

const PostStateContext = React.createContext<PostState | undefined>(undefined);
const PostDispatchContext = React.createContext<PostDispatch | undefined>(
  undefined
);
interface PostProviderProps {
  board: Board;
  children: ReactNode;
}

export default function PostProvider(props: PostProviderProps) {
  const [postState, dispatch] = React.useReducer(postReducer, {} as Post);
  let { board } = props;
  useEffect(() => {
    if (board.boardName) {
      let post: Post = BoardMapper.mapToPostModel(board);
      dispatch({
        key: "set post",
        payload: post
      });
    }
  }, [board]);

  return (
    <PostStateContext.Provider value={postState}>
      <PostDispatchContext.Provider value={dispatch}>
        {props.children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export function usePostState() {
  const context = React.useContext(PostStateContext);
  if (context === undefined) {
    throw new Error("usePostState must be used within a PostProvider");
  }
  return context;
}

export function usePostDispatch() {
  const context = React.useContext(PostDispatchContext);
  if (context === undefined) {
    throw new Error("usePostDispatch must be used within a PostProvider");
  }
  return context;
}

type PostAction =
  | { key: "set post"; payload: Post }
  | { key: "update post"; payload: { key: keyof Post; payload: any } };

type PostDispatch = (action: PostAction) => void;

function postReducer(state: PostState, action: PostAction): Post {
  switch (action.key) {
    case "set post":
      return action.payload;
    case "update post":
      return { ...state, [action.payload.key]: action.payload.payload };
  }
}
