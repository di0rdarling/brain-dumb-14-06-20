import React, { useState } from "react";
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { useResourceListState } from '../../context/resourcesListContext';
import { useBoardDispatch } from '../../context/boardContext';
import { Resource } from "../../domain/objects/subObjects/resource";
import { ObjectType } from "../../domain/objects/subObjects/objectType";

const useStyles = makeStyles({
  root: {
    padding: 8,
    margin: 8,
  },
  header: {
    textAlign: 'center',
    margin: '16px 0px',
    height: 32
  },
  resourceContainer: {
    margin: '8px 0px',
    border: 'solid thin black'

  }
})

export default function ResourcesListContainer() {
  let classes = useStyles();
  let [creatingResource, setCreatingResource] = useState<boolean>()
  let resources: Resource[] = useResourceListState();
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

  return (
    <Box className={classes.root} component={Paper}>
      <Box className={classes.header}>
        <Typography variant='h5'>Resources</Typography>
      </Box>
      {!creatingResource ? (
        <Button onClick={() => setCreatingResource(true)}>Create resource</Button>
      ) : (
          <Box>
            <TextField onChange={handleResourceTitleInput} />
            <Button onClick={() => createResource()}>CREATE</Button>
          </Box>
        )}
      {resources && (
        <Box>
          {resources.map(resource => (
            <Box className={classes.resourceContainer}>
              <Typography>Resource title: {resource.resourceTitle}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
