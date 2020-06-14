import React from "react";
import { useNoteListState } from "../context/notesListContext";
import { Box, Typography } from "@material-ui/core";
import { Note } from "../domain/objects/subObjects/note";

export default function NoteContainer() {
  let notes: Note[] = useNoteListState();

  return (
    <Box>
      {notes && (
        <Box>
          {notes.map(note => (
            <Box>
              <Typography>{note.subObjectDisplayValue}</Typography>
              <Typography>Content: {note.content}</Typography>
              <Typography>Additional Notes: {note.additionalNotes}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
