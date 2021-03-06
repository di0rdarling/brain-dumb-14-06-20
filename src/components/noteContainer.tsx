import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, makeStyles, Paper, IconButton, Tooltip, Modal, Badge } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Create';
import { Note } from "../domain/objects/subObjects/note";
import { convertToReadableDateTime } from '../utils/dateTimeUtils';
import Tag from "./common/tag";

const useStyles = makeStyles({
    root: {
        margin: '16px 0px',
        border: 'solid thin #9BA7AB',
        borderRadius: '5px',
        padding: '8px 16px',
        borderTop: 'solid #1FB7EA'
    },
    contentContainer: {
        margin: '8px 0px'
    },
    modalRoot: {
        padding: '250px 350px',
    },
    modalBody: {
        padding: 16
    },
    modalBodyHeader: {
        display: 'flex'
    },
    noteContainerFooter: {
        display: 'flex'
    },
    footerButtonContainer: {
        margin: '8px 8px 8px 0px'
    },
})

interface NoteContainerState {
    addingLink: boolean,
    editingNote: boolean,
    modalOpen: boolean,
}

interface NoteContainerProps {
    note: Note;
}

export default function NoteContainer(props: NoteContainerProps) {
    let classes = useStyles();
    let { note } = props;
    let [noteEdit, setNoteEdit] = useState<Note>({} as Note);
    let [state, setState] = useState<NoteContainerState>({
        addingLink: false,
        editingNote: false,
        modalOpen: false
    });

    useEffect(() => {
        note && setNoteEdit(note)
    }, [note])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.name === 'associatedLinks') {
            setNoteEdit({ ...noteEdit, associatedLinks: [...noteEdit.associatedLinks, event.target.value] })
        } else {
            setNoteEdit({ ...noteEdit, [event.target.name]: event.target.value })
        }
    }

    const updateNote = () => {
        // if (event.keyCode === 13) {
        //     boardDispatch({
        //         key: 'update note',
        //         payload: { note: noteEdit }
        //     })
        //     setState({ ...state, editingNote: false })
        // }
    }

    const addLink = () => {
        // boardDispatch({
        //     key: 'update note',
        //     payload: { note }
        // })
        setState({ ...state, addingLink: false })
    }

    return (
        <Box className={classes.root}>
            <Typography variant='overline'>Created on {convertToReadableDateTime(note.createdDateTime)}</Typography>
            <Box className={classes.contentContainer}>
                {!state.editingNote ? (
                    <Box>
                        <div onClick={() => setState({ ...state, editingNote: true })}>
                            <Typography>{note.content}</Typography>
                        </div>
                    </Box>
                ) : (
                        <TextField
                            name='content'
                            value={noteEdit.content}
                            onChange={handleInput}
                            onKeyDown={() => updateNote()}
                            fullWidth
                        />
                    )}
            </Box>
            <Box className={classes.noteContainerFooter}>
                <Box className={classes.footerButtonContainer}>
                    <Tooltip title='Edit note'>
                        <IconButton size='small'>
                            <EditIcon fontSize='small' onClick={() => setState({ ...state, editingNote: !state.editingNote })} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box className={classes.footerButtonContainer} >
                    {!state.addingLink ? (
                        <Tooltip title='Add link'>
                            <IconButton size='small' onClick={() => setState({ ...state, addingLink: true })}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                            <Box display='flex'>
                                <TextField

                                    onChange={handleInput}
                                />
                                <Button onClick={() => addLink()} size='small'>Add link</Button>
                            </Box>
                        )}
                </Box>
                <Box className={classes.footerButtonContainer}>
                    <Tooltip title='View links'>
                        <Badge
                            badgeContent={0}
                            color='primary'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <IconButton size='small' onClick={() => setState({ ...state, modalOpen: true })}>
                                <LinkIcon />
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Box>
                <Box>
                    <Tag text='science' />
                </Box>
            </Box>
            <Modal
                open={state.modalOpen}
                onClose={() => setState({ ...state, modalOpen: false })}
            >
                <Box className={classes.modalRoot} >
                    <Paper className={classes.modalBody} elevation={0}>
                        <Box className={classes.modalBodyHeader}>
                            <Typography>Links</Typography>
                            <IconButton>
                                <CloseIcon onClick={() => setState({ ...state, modalOpen: false })} />
                            </IconButton>
                        </Box>
                        {note.associatedLinks && note.associatedLinks.map((link, index) => (
                            <Typography>Link {index}: {link} </Typography>
                        ))}
                    </Paper>
                </Box>
            </Modal>
        </Box>
    )
}