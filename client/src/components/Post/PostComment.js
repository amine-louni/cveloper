import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from '@material-ui/core';
import Faker from 'faker';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: 'bold',
  },
  inline: {
    display: 'inline',
  },
  commentText: {
    backgroundColor: theme.palette.type === 'dark' ? '#333' : '#EFEFEF',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    margin: 0,
  },
}));

export default function PostComment({ comments }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments.map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src={Faker.image.avatar()} />
              </ListItemAvatar>
              <ListItemText
                className={classes.commentText}
                primary={
                  <Typography className={classes.fonts}>
                    {Faker.name.findName()}
                    <Typography
                      component="span"
                      variant="caption"
                      color="textPrimary"
                    >
                      <Box mx={1} component="span">
                        |
                      </Box>{' '}
                      {moment(Faker.date.past(10), 'YYYYMMDD').fromNow()}
                    </Typography>
                  </Typography>
                }
                secondary={<>{`   ${comment.body}`}</>}
              />
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
}
