import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PostComment from './PostComment';

import commentsData from '../dev-data/comments';
import defaultAvatar from '../assets/img/default.jpg';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  commentField: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #eee',
    backgroundColor: '#EEE',
  },

  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  avatar: {
    backgroundColor: theme.palette.secondary,
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
  postActions: {
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    display: 'flex',

    alignItems: 'center',
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actionBtnLove: {
    '&:hover': {
      color: red[900],
      backgroundColor: 'transparent',
    },
  },
  actionBtnComment: {
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: 'transparent',
    },
  },
  commenter: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export default function Post() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={defaultAvatar}
            />
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <EditIcon className={classes.marginRight} /> Edit post
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <BookmarkBorderIcon className={classes.marginRight} /> Save
                  post
                </MenuItem>
                <MenuItem>
                  <DeleteIcon color="error" className={classes.marginRight} />
                  Delete post
                </MenuItem>
              </Menu>
            </>
          }
          title="John Doe"
          subheader="2 Days ago"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.postActions}>
          <Button
            aria-label="add to favorites"
            className={classes.actionBtnLove}
          >
            <FavoriteBorder className={classes.marginRight} />
            <Typography variant="subtitle1">141</Typography>
          </Button>
          <Button className={classes.actionBtnComment} aria-label="share">
            <ChatBubbleOutlineIcon className={classes.marginRight} />
            <Typography variant="subtitle1">30</Typography>
          </Button>
        </CardActions>
        <PostComment comments={commentsData()} />
        <div className={classes.commenter}>
          <Avatar
            className={classes.marginRight}
            aria-label="recipe"
            src={defaultAvatar}
          />

          <Paper
            component="form"
            elevation={0}
            className={classes.commentField}
          >
            <InputBase
              multiline
              className={classes.input}
              placeholder="Type your comment ... 🖌"
              inputProps={{ 'aria-label': 'Type a comment' }}
            />
          </Paper>
        </div>
      </Card>
    </>
  );
}
