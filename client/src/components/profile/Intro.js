import React from 'react';

import {
  makeStyles,
  Avatar,
  Button,
  Typography,
  Card,
  Chip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import EventIcon from '@material-ui/icons/Event';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
  coverSection: {
    height: 230,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  userName: { textTransform: 'capitalize' },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4),
    marginTop: -160,
  },
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
    marginBottom: theme.spacing(2),
  },
  avatarLeft: {},
  bio: {
    textAlign: 'center',
  },
  infoBox: {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid #555',
    padding: '6px 16px',
    marginRight: '3px',
    borderRadius: theme.spacing(3),
  },
  skillsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skills: {
    display: 'block',
    margin: '30px 0',
  },
  skill: {
    marginRight: 7,
  },
  rightIntro: {},
}));
export default function Intro() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <div
          className={classes.coverSection}
          style={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
          }}
        >
          cover
        </div>
        <div className={classes.avatarSection}>
          <div className={classes.avatarWrapper}>
            <div className={classes.avatarLeft}>
              <Avatar className={classes.avatar} />
              <div>
                <Typography
                  variant="h5"
                  className={classes.userName}
                  display="block"
                >
                  john doe
                </Typography>
                <Typography display="block" variant="caption" gutterBottom>
                  Senior developer at orcloud
                </Typography>
                <Typography display="block" variant="subtitle">
                  <span color="primary">|</span> Working from home
                </Typography>

                <div className={classes.metaSection}>
                  <div className={classes.skillsWrapper}>
                    <div className={classes.skills}>
                      <Chip
                        className={classes.skill}
                        size="small"
                        label="HTML"
                      />
                      <Chip
                        className={classes.skill}
                        size="small"
                        label="Javascript"
                      />
                      <Chip
                        className={classes.skill}
                        size="small"
                        label="Php"
                      />
                      <Chip
                        className={classes.skill}
                        size="small"
                        label="Ruby"
                      />
                      <Chip className={classes.skill} size="small" label="R" />
                    </div>
                  </div>
                  <div className={classes.infoBox}>
                    <RoomIcon style={{ marginRight: 7 }} />
                    <div>Boston , MY</div>
                  </div>
                  <div className={classes.infoBox}>
                    <EventIcon style={{ marginRight: 7 }} />
                    <div>15 mai</div>
                  </div>
                  <div className={classes.infoBox}>
                    <EmojiFlagsIcon style={{ marginRight: 7 }} />
                    <div>Joined September, 2018</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.rightIntro}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: 30 }}
                startIcon={<EditIcon />}
              >
                edit
              </Button>
              <div>
                <a href="#">
                  <FacebookIcon style={{ marginLeft: 7, color: '#1877F2' }} />
                </a>
                <a href="#">
                  <TwitterIcon style={{ marginLeft: 7, color: '#1DA1F2' }} />
                </a>
                <a href="#">
                  <InstagramIcon style={{ marginLeft: 7, color: '#E1306C' }} />
                </a>
                <a href="#">
                  <GitHubIcon style={{ marginLeft: 7, color: '#333' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
