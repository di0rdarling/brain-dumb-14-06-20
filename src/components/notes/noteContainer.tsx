import React, { useState } from "react";
import { Box, Typography, TextField, Button, makeStyles, Paper, IconButton, Tooltip, Modal, Badge } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Note } from "../../domain/objects/subObjects/note";
import { useBoardDispatch, BoardDispatch } from "../../context/boardContext";
import { convertToReadableDateTime } from '../../utils/dateTimeUtils';

const useStyles = makeStyles({
    root: {
        margin: '8px 0px',
        border: 'solid thin black',
        padding: '8px'
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

interface NoteContainerProps {
    note: Note;
}

export default function NoteContainer(props: NoteContainerProps) {
    let classes = useStyles();
    let [addingLink, setAddingLink] = useState<boolean>(false);
    let [modalOpen, setModelOpen] = useState<boolean>(false);
    let boardDispatch: BoardDispatch = useBoardDispatch();
    let { note } = props;

    let link = ''
    const handleLinkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        link = event.target.value;
    }

    const addLink = () => {
        note.associatedLinks = [...note.associatedLinks, link];
        boardDispatch({
            key: 'update note',
            payload: { note }
        })
        setAddingLink(false)
    }

    return (
        <Box className={classes.root}>
            <Typography variant='overline'>Created on {convertToReadableDateTime(note.createdDateTime)}</Typography>
            <Box className={classes.contentContainer}>
                <Typography>{note.content}</Typography>
            </Box>
            <Box className={classes.noteContainerFooter}>
                <Box className={classes.footerButtonContainer} >
                    {!addingLink ? (
                        <Tooltip title='Add link'>
                            <IconButton size='small' onClick={() => setAddingLink(true)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                            <Box display='flex'>
                                <TextField
                                    onChange={handleLinkInput}
                                />
                                <Button onClick={() => addLink()} size='small'>Add link</Button>
                            </Box>
                        )}
                </Box>
                <Box className={classes.footerButtonContainer}>
                    <Tooltip title='View links'>
                        <Badge
                            badgeContent={note.associatedLinks.length}
                            color='primary'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <IconButton size='small' onClick={() => setModelOpen(true)}>
                                <LinkIcon />
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Box>
            </Box>
            <Modal
                open={modalOpen}
                onClose={() => setModelOpen(false)}
            >
                <Box className={classes.modalRoot} >
                    <Paper className={classes.modalBody} elevation={0}>
                        <Box className={classes.modalBodyHeader}>
                            <Typography>Links</Typography>
                            <IconButton>
                                <CloseIcon onClick={() => setModelOpen(false)} />
                            </IconButton>
                        </Box>
                        {note.associatedLinks.map((link, index) => (
                            <Typography>Link {index}: {link} </Typography>
                        ))}
                    </Paper>
                </Box>
            </Modal>
        </Box>
    )
}