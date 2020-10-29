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
import dayjs from 'dayjs';

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

export default function PostComment(props) {
  const classes = useStyles();
  const [myComments, setMyComments] = React.useState([]);
  console.log(props);
  React.useEffect(() => {
    (async () => {
      const comments = await props.comments;
      await setMyComments(comments);
    })();
  }, [props]);
  return (
    <List className={classes.root}>
      {myComments &&
        myComments.map((comment) => {
          return (
            <React.Fragment key={comment.id}>
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.user.userName}
                    src={comment.user.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.commentText}
                  primary={
                    <Typography className={classes.fonts}>
                      @{comment.user.userName}
                      <Typography
                        component="span"
                        variant="caption"
                        color="textPrimary"
                      >
                        <Box mx={1} component="span">
                          |
                        </Box>{' '}
                        {dayjs(comment.createdAt).format('DD/MM/YYYY')}
                      </Typography>
                    </Typography>
                  }
                  secondary={<>{`   ${comment.text}`}</>}
                />
              </ListItem>
            </React.Fragment>
          );
        })}
    </List>
  );
}
