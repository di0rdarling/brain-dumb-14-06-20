import React from "react";
import { usePostListState } from "../context/postListContext";
import { Box, Typography } from "@material-ui/core";
import { Post } from "../domain/objects/subObjects/post";

export default function PostContainer() {
  let posts: Post[] = usePostListState();

  return (
    <Box>
      {posts && (
        <Box>
          {posts.map(post => (
            <Box>
              <Typography>{post.subObjectDisplayValue}</Typography>
              <Typography>Post title: {post.postTitle}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
