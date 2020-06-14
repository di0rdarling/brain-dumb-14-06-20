import React from 'react';
import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, TextField } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import TagWrapper from './tag';
import { makeStyles } from '@material-ui/styles';
import { Tag } from '../../domain/objects/tag';
import { ObjectType } from '../../domain/objects/subObjects/objectType';
import { BoardDispatch, useBoardDispatch } from '../../context/boardContext';

const useStyles = makeStyles({
    tagsContainer: {
        display: 'flex',
        paddingBottom: 10
    }
})

interface TagContainerProps {
    tags: Tag[],
    sourceObjectDetails: { objectType: ObjectType, objectId: number };
}

export default function TagContainer(props: TagContainerProps) {

    let classes = useStyles();
    let { tags, sourceObjectDetails } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let isAddingTag = Boolean(anchorEl);
    let boardDispatch: BoardDispatch = useBoardDispatch();
    const ITEM_HEIGHT = 48;
    let newTag = '';

    const toggleTagMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        newTag = event.target.value
    }

    const addTag = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === 13) {
            switch (sourceObjectDetails.objectType) {
                case ObjectType.TASK:
                    boardDispatch({
                        key: 'add tag',
                        payload: {
                            objectType: ObjectType.TASK, objectId: sourceObjectDetails.objectId, tag: {
                                name: newTag,
                                colour: '#8E8DBE'
                            }
                        }
                    })
            }

            setAnchorEl(null);
        }
    }

    return (
        <Box display='flex'>
            <IconButton onClick={toggleTagMenu} size='small'>
                <MoreIcon fontSize='small' />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={isAddingTag}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={toggleTagMenu}>
                    <TextField
                        label='New Tag'
                        inputProps={{
                            style: {
                                padding: 5
                            }
                        }}
                        onChange={handleTagInput}
                        onKeyDown={addTag}
                        variant='outlined' />
                </MenuItem>

            </Menu>
            {tags.map((tag) => (
                <Box className={classes.tagsContainer}>
                    <TagWrapper text={tag.name} colour={tag.colour} />
                </Box>
            ))}
        </Box>
    )
}