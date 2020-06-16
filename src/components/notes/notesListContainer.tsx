import React, { useState } from "react";
import { useNoteListState } from "../../context/notesListContext";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { Note } from "../../domain/objects/subObjects/note";
import { ObjectType } from "../../domain/objects/subObjects/objectType";
import { useBoardDispatch } from "../../context/boardContext";
import NoteContainer from './noteContainer';

const useStyles = makeStyles({
  root: {
    padding: 8,
    margin: 8
  },
  header: {
    textAlign: 'center',
    margin: '16px 0px',
    height: 32
  },


})

export default function NotesListContainer() {

  let classes = useStyles();
  let [creatingNote, setCreatingNote] = useState<boolean>(false);
  let notes: Note[] = useNoteListState();
  let boardDispatch = useBoardDispatch()

  let link = ''
  const handleLinkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    link = event.target.value;
  }


  const createNote = () => {

    let note: Note = {
      id: 3,
      createdAuthor: 'test created author',
      createdDateTime: new Date().toISOString(),
      associatedLinks: [link],
      content: 'this is created note content.'
    }
    boardDispatch({
      key: 'create object',
      payload: {
        objectType: ObjectType.NOTE,
        object: note
      }
    })
    setCreatingNote(false)
  }

  return (
    <Box className={classes.root} component={Paper}>
      <Box className={classes.header}>
        <Typography variant='h5'>Notes</Typography>
      </Box>
      {!creatingNote ? (
        <Button onClick={() => setCreatingNote(true)}>Create note</Button>
      ) : (
          <Box>
            <TextField onChange={handleLinkInput} />
            <Button onClick={() => createNote()}>CREATE</Button>
          </Box>
        )}
      {notes && (
        <Box>
          {notes.map((note, index) => (
            <NoteContainer key={index} note={note} />
          ))}
        </Box>
      )}
    </Box>
  );
}
