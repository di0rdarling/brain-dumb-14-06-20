import React from "react";
import { useNoteListState } from "../context/notesListContext";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Note } from "../domain/objects/subObjects/note";
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
  noteContainer: {
    margin: '8px 0px',
    border: 'solid thin black'

  }
})

export default function NoteListContainer() {

  let classes = useStyles();
  let notes: Note[] = useNoteListState();
  let boardDispatch = useBoardDispatch()

  let newNoteAdditionalNotes = ''
  const handNewNoteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    newNoteAdditionalNotes = event.target.value;
  }

  const createNote = () => {

    let note: Note = {
      id: 3,
      createdAuthor: 'test created author',
      additionalNotes: newNoteAdditionalNotes,
      objectType: ObjectType.TASK,
      content: 'this is created note content.'
    }
    boardDispatch({
      key: 'create note',
      payload: { note }
    })
  }

  return (
    <Box className={classes.root} component={Paper}>
      <Typography className={classes.containerHeader} variant='h5'>Notes</Typography>
      <TextField onChange={handNewNoteInput} />
      <Button onClick={() => createNote()}>CREATE</Button>
      {notes && (
        <Box>
          {notes.map(note => (
            <Box className={classes.noteContainer}>
              <Box>
                <Typography>Description</Typography>
                <Typography>{note.content}</Typography>
              </Box>
              <Box>
                <Typography>Additional Description</Typography>
                <Typography>{note.additionalNotes}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
