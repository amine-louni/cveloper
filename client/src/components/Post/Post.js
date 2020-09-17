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

import defaultAvatar from '../../assets/img/default.jpg';

import { CardActionArea, CardMedia } from '@material-ui/core';

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
    backgroundColor: theme.palette.type === 'dark' ? '#333' : '#EFEFEF',
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
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  postActions: {
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
  title: {
    fontWeight: 'bold',
    color: theme.palette.type === 'dark' ? '#FFF' : '#000',
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
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image="https://source.unsplash.com/user/erondu/1600x900"
            title="Contemplative Reptile"
          />

          <CardContent>
            <Typography
              variant="h5"
              className={classes.title}
              color="textSecondary"
              component="h2"
            >
              Where do you host server-side code?
            </Typography>
            <div>#html #css #react #formik</div>
          </CardContent>
          <CardActions className={classes.postActions}>
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
        </CardActionArea>
      </Card>
    </>
  );
}
