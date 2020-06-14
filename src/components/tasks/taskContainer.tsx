import React, { useState } from "react";
import { Task } from "../../domain/objects/subObjects/task/task"
import { Box, Typography, TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { useBoardDispatch } from "../../context/boardContext";
import { convertToReadableDateTime } from '../../utils/dateTimeUtils';
import Tag from '../common/tag';

const useStyles = makeStyles({
    root: {
        margin: '16px 0px',
        borderTop: 'solid #7FD14D',
        border: 'solid thin #9BA7AB',
        padding: '8px 16px'
    }
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
            <Typography>Tag: {task.tag}</Typography>
            {task.taskLinks && (
                <Box>
                    <Typography>Task: {task.taskLinks[0].task}</Typography>
                    <Typography>Task link: {task.taskLinks[0].taskContent}</Typography>
                </Box>
            )}
            <Box>
                <Tag text='maths' />
            </Box>
        </Box>
    )
}