import React from "react";
import { usePostState } from "../context/postContext";
import { Box, Typography } from "@material-ui/core";

export default function PostContainer() {
  let post = usePostState();

  return (
    <Box>
      <Typography>{post.subObjectDisplayValue}</Typography>
      <Typography>Post title: {post.postTitle}</Typography>
    </Box>
  );
}
