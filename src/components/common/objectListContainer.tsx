import React, { useState } from "react";
import { Box, Typography, TextField, Button, makeStyles, Paper, IconButton, Tooltip } from "@material-ui/core";
import FilterIcon from '@material-ui/icons/TuneRounded';
import { Note } from "../../domain/objects/subObjects/note";
import { ObjectType, ObjectTypeDisplayLabel } from "../../domain/objects/subObjects/objectType";
import { useBoardState, useBoardDispatch } from "../../context/boardContext";
import NoteContainer from '../noteContainer';
import TaskContainer from '../taskContainer';
import ResourceContainer from '../resourceContainer';

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
    filterIcon: {
        float: 'right'
    }

})

interface ObjectListContainerProps {
    objectType: ObjectType;
}

export default function ObjectListContainer(props: ObjectListContainerProps) {

    let classes = useStyles();
    let { objectType } = props;
    let [creatingObject, setCreatingObject] = useState<boolean>(false);
    let board = useBoardState()
    let boardDispatch = useBoardDispatch();

    let link = ''
    const handleLinkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        link = event.target.value;
    }


    const createObject = () => {

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
                objectType: objectType,
                object: note
            }
        })
        setCreatingObject(false)
    }

    return (
        <Box className={classes.root} component={Paper}>
            <Box className={classes.header}>
                <Typography variant='h5'>{ObjectTypeDisplayLabel.get(objectType)}</Typography>
            </Box>
            {!creatingObject ? (
                <Box>
                    <Button onClick={() => setCreatingObject(true)}>Create {ObjectTypeDisplayLabel.get(objectType)}</Button>
                    <Tooltip title='filter'>
                        <IconButton size='small' className={classes.filterIcon}>
                            <FilterIcon />
                        </IconButton>
                    </Tooltip>

                </Box>
            ) : (
                    <Box>
                        <TextField onChange={handleLinkInput} />
                        <Button onClick={() => createObject()}>CREATE</Button>
                    </Box>
                )}

            {board && (
                <Box>
                    {objectType === ObjectType.TASK && (
                        <Box>
                            {board.tasks.map((task, index) => (
                                <TaskContainer key={index} task={task} />
                            ))}
                        </Box>
                    )}
                    {objectType === ObjectType.NOTE && (
                        <Box>
                            {board.notes.map((note, index) => (
                                <NoteContainer key={index} note={note} />
                            ))}
                        </Box>
                    )}
                    {objectType === ObjectType.RESOURCE && (
                        <Box>
                            {board.resources.map((resource, index) => (
                                <ResourceContainer key={index} resource={resource} />
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
