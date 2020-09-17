import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import {
  Search,
  Brightness3,
  WbSunny,
  NotificationsOutlined,
  MailOutline,
} from '@material-ui/icons';
import {
  Avatar,
  Box,
  Badge,
  Switch,
  Button,
  MenuItem,
  Menu,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  MenuList,
  Divider,
} from '@material-ui/core';
import defaultAvatar from '../../assets/img/default.jpg';

import { changeTheme } from '../../actions/';
import { connect } from 'react-redux';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
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
    marginLeft: 30,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const { isDark } = props;
  console.log('isdark', isDark);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

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
      <HideOnScroll {...props}>
        <AppBar color="primary">
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
              devLink
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
            <Button
              variant="contained"
              color="default"
              style={{ marginRight: 30 }}
              size="small"
              endIcon={<AddCircleOutlineOutlinedIcon />}
            >
              write a post
            </Button>
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
            {/* <Box mx={6} style={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                checked={isDark}
                onChange={changeTheme}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              {!isDark ? <WbSunny /> : ''}
              {isDark ? <Brightness3 style={{ color: '#555' }} /> : ''}
            </Box> */}
            <div className={classes.userInfos}>
              <IconButton
                disableRipple
                edge={false}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Avatar src={defaultAvatar} />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ minWidth: 270 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'left top',
                    }}
                  >
                    <Paper>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={handleClose}
                          style={{ display: 'block' }}
                        >
                          <Typography
                            display="block"
                            style={{ width: '100%' }}
                            variant="subtitle1"
                          >
                            John Doe
                          </Typography>{' '}
                          <Typography display="block" variant="caption">
                            @john_doe
                          </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={props.changeTheme}>
                          Dark mode
                          <Switch
                            checked={isDark}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          {!isDark ? (
                            <WbSunny style={{ color: 'goldenrod' }} />
                          ) : (
                            ''
                          )}
                          {isDark ? <Brightness3 /> : ''}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            <div className={classes.sectionDesktop}></div>
            <div className={classes.sectionMobile}></div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
};

const mapStateToProps = ({ isDark }) => {
  return { isDark };
};
export default connect(mapStateToProps, { changeTheme })(Navbar);
