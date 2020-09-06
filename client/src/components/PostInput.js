import React from 'react';
import {
  makeStyles,
  Paper,
  Avatar,
  Button,
  InputBase,
} from '@material-ui/core';
import defaultAvatar from '../assets/img/default.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    padding: theme.spacing(4),
  },
  innerWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(3),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  btnRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  inputPaper: {
    width: '100%',
    border: '1px solid #777',
  },
}));

export default function PostInput() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.innerWrapper}>
        <Avatar sizes={'52'} className={classes.avatar} src={defaultAvatar} />

        <Paper className={classes.inputPaper} elevation={0} component="form">
          <InputBase
            fullWidth
            className={classes.input}
            multiline
            rows={4}
            placeholder="Write your ideas ... 👋"
            inputProps={{ 'aria-label': 'Type a comment' }}
          />
        </Paper>
      </div>
      <div className={classes.btnRight}>
        <Button variant="contained" color="primary">
          post
        </Button>
      </div>
    </Paper>
  );
}
