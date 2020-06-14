import React from "react";
import { useNoteState } from "../context/noteContext";
import { Box, Typography } from "@material-ui/core";

export default function NoteContainer() {
  let note = useNoteState();

  return (
    <Box>
      <Typography>{note.subObjectDisplayValue}</Typography>
      <Typography>Content: {note.content}</Typography>
      <Typography>Additional Notes: {note.additionalNotes}</Typography>
    </Box>
  );
}
