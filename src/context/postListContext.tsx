import React, { useEffect, ReactNode } from "react";
import { Post } from "../domain/objects/subObjects/post";
import { Board } from "../domain/board";

type PostListState = Post[];

const PostListStateContext = React.createContext<PostListState | undefined>(undefined);
const PostDispatchContext = React.createContext<PostDispatch | undefined>(
  undefined
);
interface PostListProviderProps {
  board: Board;
  children: ReactNode;
}

export default function PostListProvider(props: PostListProviderProps) {
  const [postListState, dispatch] = React.useReducer(postListReducer, []);
  let { board } = props;
  useEffect(() => {
    if (board.boardName) {
      let postList: Post[] = board.posts;
      dispatch({
        key: "set posts",
        payload: postList
      });
    }
  }, [board]);

  return (
    <PostListStateContext.Provider value={postListState}>
      <PostDispatchContext.Provider value={dispatch}>
        {props.children}
      </PostDispatchContext.Provider>
    </PostListStateContext.Provider>
  );
}

export function usePostListState() {
  const context = React.useContext(PostListStateContext);
  if (context === undefined) {
    throw new Error("usePostListState must be used within a PostlistProvider");
  }
  return context;
}

export function usePostDispatch() {
  const context = React.useContext(PostDispatchContext);
  if (context === undefined) {
    throw new Error("usePostDispatch must be used within a PostlistProvider");
  }
  return context;
}

type PostListAction =
  | { key: "set posts"; payload: Post[] }
  | { key: "update posts"; payload: Post[] }
  | { key: "update post"; payload: { postId: number; key: keyof Post; value: any } };

type PostDispatch = (action: PostListAction) => void;

function postListReducer(state: PostListState, action: PostListAction): Post[] {
  switch (action.key) {
    case "set posts":
      return action.payload;
    case "update posts":
      return action.payload;
    case "update post":
      return updatePost(state, action.payload.postId, action.payload.key, action.payload.value)

  }
}

function updatePost(state: PostListState, id: number, key: keyof Post, value: any) {

  let index = state.findIndex(post => post.id === id)
  let post = state[index];
  let updatedPost = { ...post, [key]: value }
  state.splice(index, 1);
  return [...state, updatedPost];
}
