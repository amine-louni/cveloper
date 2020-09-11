import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';

import {
  Search,
  Brightness3,
  WbSunny,
  NotificationsOutlined,
  PeopleOutline,
  MailOutline,
} from '@material-ui/icons';
import { Avatar, Box, Badge, Switch } from '@material-ui/core';
import defaultAvatar from '../../assets/img/default.jpg';

import { changeTheme } from '../../actions/';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      maxWidth: '500px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  userInfos: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Navbar = function ({ isDark, changeTheme }) {
  const classes = useStyles();
  const [open] = React.useState(false);
  const anchorRef = React.useRef(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            cveloper
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <IconButton>
            <Badge badgeContent={4} color="error">
              <PeopleOutline />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <MailOutline />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <Box ml={6} style={{ display: 'flex', alignItems: 'center' }}>
            {!isDark ? <WbSunny style={{ color: 'gold' }} /> : ''}
            <Switch
              checked={isDark}
              onChange={changeTheme}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {isDark ? <Brightness3 style={{ color: '#555' }} /> : ''}
          </Box>
          <div className={classes.userInfos}>
            <Box mx={3}>John doe</Box>
            <Avatar src={defaultAvatar} />
          </div>
          <div className={classes.sectionDesktop}></div>
          <div className={classes.sectionMobile}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({ isDark }) => {
  return { isDark };
};
export default connect(mapStateToProps, { changeTheme })(Navbar);
