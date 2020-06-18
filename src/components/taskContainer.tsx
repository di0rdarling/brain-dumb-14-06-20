import React from "react";
import { Task } from "../domain/objects/subObjects/task/task"
import { Box, Typography, makeStyles } from "@material-ui/core";
import { convertToReadableDateTime } from '../utils/dateTimeUtils';
import TagContainer from './common/tagContainer'
import { ObjectType } from "../domain/objects/subObjects/objectType";

const useStyles = makeStyles({
    root: {
        margin: '16px 0px',
        borderTop: 'solid #7FD14D',
        border: 'solid thin #9BA7AB',
        padding: '8px 16px',
        borderRadius: '5px'
    },

})

interface TaskContainerProps {
    task: Task;
}

export default function TaskContainer(props: TaskContainerProps) {

    let classes = useStyles();
    let { task } = props;


    return (
        <Box className={classes.root}>
            <Typography variant='overline'>Created on {convertToReadableDateTime(task.createdDateTime)}</Typography>
            <Typography>{task.content}</Typography>
            {task.tags && (
                <TagContainer sourceObjectDetails={{ objectType: ObjectType.TASK, objectId: task.id }} tags={task.tags} />
            )}
        </Box>
    )
}