import React from 'react';
import styled from 'styled-components';
import TagIcon from '@material-ui/icons/LocalOffer';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    tagIcon: {
        fontSize: 15,
        margin: '4px 6px 0px 6px'
    },
})
interface TagProps {
    text?: string,
    colour?: string,
}

const Box = styled.div<TagProps>`
  background: ${props => props.colour};
  border-radius: 20px;
  color: white;
  display: flex;
  margin: 11px 8px 0px 8px;
  padding-bottom: 2px;
  height: 20px;
`;

export default function TagWrapper(props: TagProps) {

    let classes = useStyles();
    let { text, colour } = props;
    return (
        <Box colour={colour || '#06D6A0'}>
            <TagIcon fontSize='inherit' className={classes.tagIcon} />
            <Typography>{text}</Typography>
        </Box>

    )
}