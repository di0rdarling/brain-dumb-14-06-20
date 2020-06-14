import React, { useState } from "react";
import { usePostListState } from "../context/postListContext";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Post } from "../domain/objects/subObjects/post";
import { ObjectType } from "../domain/objects/subObjects/objectType";
import { useBoardDispatch } from "../context/boardContext";

const useStyles = makeStyles({
  root: {
    padding: 8,
    margin: 8,
  },
  header: {
    textAlign: 'center',
    margin: '16px 0px',
    height: 32
  },
  postContainer: {
    margin: '8px 0px',
    border: 'solid thin black'

  }
})

export default function PostListContainer() {
  let classes = useStyles();
  let [creatingPost, setCreatingPost] = useState<boolean>()
  let posts: Post[] = usePostListState();
  let boardDispatch = useBoardDispatch()
  let newPostTitle = '';

  const handleNewPostInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    newPostTitle = event.target.value;
  }

  const createPost = () => {

    let post: Post = {
      id: 3,
      createdAuthor: 'test created author',
      createdDateTime: new Date().toISOString(),
      postTitle: newPostTitle,
      content: 'this is created post content.'
    }
    boardDispatch({
      key: 'create object',
      payload: {
        objectType: ObjectType.POST,
        object: post
      }
    })
  }

  return (
    <Box className={classes.root} component={Paper}>
      <Box className={classes.header}>
        <Typography variant='h5'>Posts</Typography>
      </Box>
      {!creatingPost ? (
        <Button onClick={() => setCreatingPost(true)}>Create post</Button>
      ) : (
          <Box>
            <TextField onChange={handleNewPostInput} />
            <Button onClick={() => createPost()}>CREATE</Button>
          </Box>
        )}
      {posts && (
        <Box>
          {posts.map(post => (
            <Box className={classes.postContainer}>
              <Typography>Post title: {post.postTitle}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
