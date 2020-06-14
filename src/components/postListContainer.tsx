import React from "react";
import { usePostListState } from "../context/postListContext";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Post } from "../domain/objects/subObjects/post";
import { ObjectType } from "../domain/objects/subObjects/objectType";
import { useBoardDispatch } from "../context/boardContext";

const useStyles = makeStyles({
  root: {
    padding: 8,
    margin: 8
  },
  containerHeader: {
    margin: '8px 0px'
  },
  postContainer: {
    margin: '8px 0px',
    border: 'solid thin black'

  }
})

export default function PostListContainer() {
  let classes = useStyles();
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
      postTitle: newPostTitle,
      objectType: ObjectType.POST,
      content: 'this is created post content.'
    }
    boardDispatch({
      key: 'create post',
      payload: { post }
    })
  }

  return (
    <Box className={classes.root} component={Paper}>
      <Typography className={classes.containerHeader} variant='h5'>Posts</Typography>
      <TextField onChange={handleNewPostInput} />
      <Button onClick={() => createPost()}>CREATE</Button>
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
