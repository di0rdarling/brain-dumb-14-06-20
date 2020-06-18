import React, { useState } from "react";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { useBoardDispatch } from '../context/boardContext';
import { Resource } from "../domain/objects/subObjects/resource";
import { ObjectType } from "../domain/objects/subObjects/objectType";
import { convertToReadableDateTime } from '../utils/dateTimeUtils';

const useStyles = makeStyles({
  root: {
    margin: '16px 0px',
    border: 'solid thin #9BA7AB',
    borderRadius: '5px',
    padding: '8px 16px',
    borderTop: 'solid #FFD166'
  },
  resourceContainer: {
    margin: '8px 0px',
    border: 'solid thin black'
  },
  contentContainer: {
    margin: '8px 0px'
  },
})

interface ResourceContainerState {
  addingLink: boolean,
  editingResource: boolean,
  modalOpen: boolean,
}

interface ResourceContainerProps {
  resource: Resource;
}

export default function ResourceContainer(props: ResourceContainerProps) {
  let classes = useStyles();
  let { resource } = props;
  let [resourceEdit, setResourceEdit] = useState<Resource>({} as Resource);
  let [state, setState] = useState<ResourceContainerState>({
    addingLink: false,
    editingResource: false,
    modalOpen: false
  });
  let boardDispatch = useBoardDispatch()
  let resourceTitle = '';

  const handleResourceTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    resourceTitle = event.target.value;
  }

  const createResource = () => {

    let resource: Resource = {
      id: 3,
      createdAuthor: 'test created author',
      createdDateTime: new Date().toISOString(),
      resourceTitle: resourceTitle,
      content: 'this is created resource content.'
    }
    boardDispatch({
      key: 'create object',
      payload: {
        objectType: ObjectType.RESOURCE,
        object: resource
      }
    })
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {


  }

  const updateResource = () => {
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
    <Box className={classes.root} component={Paper}>
      <Typography variant='overline'>Created on {convertToReadableDateTime(resource.createdDateTime)}</Typography>
      <Box className={classes.contentContainer}>
        {!state.editingResource ? (
          <Box>
            <div onClick={() => setState({ ...state, editingResource: true })}>
              <Typography>{resource.content}</Typography>
            </div>
          </Box>
        ) : (
            <TextField
              name='content'
              value={resourceEdit.content}
              onChange={handleInput}
              onKeyDown={() => updateResource()}
              fullWidth
            />
          )}
      </Box>
    </Box>
  );
}
