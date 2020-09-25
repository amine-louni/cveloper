import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions';
import AdvancedFormat from 'dayjs/plugin/advancedFormat'; // ES 2015
import Skeleton from 'react-loading-skeleton';

import dayjs from 'dayjs';
import {
  makeStyles,
  Avatar,
  Button,
  Typography,
  Card,
  Chip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import TwitterIcon from '@material-ui/icons/Twitter';

import GitHubIcon from '@material-ui/icons/GitHub';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';

import defaultAvatar from '../../assets/img/default.jpg';
import EditProfileDialog from './diloags/EditProfileDialog';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
  coverSection: {
    height: 70,

    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
  userName: { textTransform: 'capitalize' },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4),

    position: 'relative',
  },
  avatar: {
    height: theme.spacing(13),
    width: theme.spacing(13),

    margin: 'auto',
  },
  wrapper: {
    position: 'relative',
  },
  avatarCenter: {
    margin: '0 auto',
    textAlign: 'center',
    marginTop: -70,
  },
  bio: {
    textAlign: 'center',
  },
  infoBox: {
    display: 'inline-flex',
    alignItems: 'flex-end',
    marginRight: '7px',
  },
  skillsWrapper: {
    margin: '7px 0',
    textAlign: 'center',
  },
  skills: {
    display: 'block',
    textAlign: 'center',
  },
  skill: {
    marginRight: 7,
  },
  rightIntro: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

function Intro(props) {
  const classes = useStyles();

  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleOpenEdit = () => {
    setOpenEditDialog(true);
  };
  const handleCloseEdit = () => {
    setOpenEditDialog(false);
  };

  useEffect(() => {
    props.getCurrentUserProfile();
  }, []);

  return (
    <Card className={classes.root}>
      <div>
        <div className={classes.coverSection}></div>
        <div className={classes.wrapper}>
          <div className={classes.avatarWrapper}>
            <div className={classes.avatarCenter}>
              <Avatar
                className={classes.avatar}
                src={props.user ? props.user.avatar : ''}
              />
              <div>
                <Typography
                  variant="h5"
                  className={classes.userName}
                  display="block"
                >
                  {props.user ? props.user.firstName : ''}{' '}
                  {props.user ? props.user.lastName : ''}{' '}
                  <span>
                    <a href="/">
                      <TwitterIcon
                        style={{ marginLeft: 7, color: '#1DA1F2' }}
                      />
                    </a>

                    <a href="/">
                      <GitHubIcon style={{ marginLeft: 7, color: '#333' }} />
                    </a>
                  </span>
                </Typography>
                <Typography variant="caption" gutterBottom>
                  {props.profile ? props.profile.title : ''}{' '}
                  {props.profile ? props.profile.company || '' : ''}
                </Typography>
                <Typography display="block" variant="subtitle1">
                  {props.profile ? props.profile.status : ''}
                </Typography>

                <div className={classes.metaSection}>
                  {props.profile && props.profile.skills.length > 0 ? (
                    <div className={classes.skillsWrapper}>
                      <div className={classes.skills}>
                        {props.profile &&
                          props.profile.skills.map((skill) => {
                            return (
                              <Chip
                                className={classes.skill}
                                size="small"
                                label={skill}
                              />
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className={classes.skillsWrapper}>
                      Didn't add any skills yet 👻
                    </div>
                  )}

                  {/* <div className={classes.infoBox}>
                    <RoomIcon style={{ marginRight: 7 }} />
                    <div>Boston , MY</div>
                  </div> */}

                  <div className={classes.infoBox}>
                    <CakeOutlinedIcon style={{ marginRight: 7 }} />
                    <div>
                      {props.user ? (
                        'Joined ' +
                        dayjs(props.user.createdAt).format('MMMM D, YYYY')
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.rightIntro}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenEdit}
                style={{ margin: 7 }}
              >
                edit profile
              </Button>
              <EditProfileDialog
                openEditDialog={openEditDialog}
                handleClickOpenEdit={openEditDialog}
                handleCloseEdit={handleCloseEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    profile: state.userProfile.profile,
  };
};
export default connect(mapStateToProps, { getCurrentUserProfile })(Intro);
