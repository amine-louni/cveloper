import React from 'react';
import { connect } from 'react-redux';
import { delExp } from '../../actions';

import dayjs from 'dayjs';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AddEducationDialog from './diloags/AddEducationDialog';
import AddExperienceDialog from './diloags/AddExperienceDialog';
import { MoreVert } from '@material-ui/icons';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2), position: 'relative' },
  MoreVert: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: '7px 14px',
  },
  LeftTimeLine: {
    '&:before': {
      flex: 0,
      padding: 0,
    },
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
function History(props) {
  const classes = useStyles();

  const [openEduDialog, setOpenEduDialog] = React.useState(false);
  const [openExpDialog, setOpenExpDialog] = React.useState(false);
  const [openExpDialogUpdate, setOpenExpDialogUpdate] = React.useState(false);
  const handleClickOpenEdu = () => {
    setOpenEduDialog(true);
  };
  const handleCloseEdu = () => {
    setOpenEduDialog(false);
  };

  const handleClickOpenExp = () => {
    setOpenExpDialog(true);
  };
  const handleCloseExp = () => {
    setOpenExpDialog(false);
  };
  const handleClickOpenExpUpdate = () => {
    setOpenExpDialogUpdate(true);
  };
  const handleCloseExpUpdate = () => {
    setOpenExpDialogUpdate(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };
  const [expUpdateValues, setExpUpdateValues] = React.useState({});
  const returnFn = (body) => {
    console.log(body);
    setExpUpdateValues(body);
  };
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <div className={classes.cardTitle}>
            <Typography variant="h5">Experience</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpenExp}
            >
              Add an experience
            </Button>
          </div>
          <AddExperienceDialog
            openExpDialog={openExpDialog}
            closeExp={handleCloseExp}
            openExp={handleClickOpenExp}
          />
          <AddExperienceDialog
            update={true}
            prevValues={expUpdateValues}
            openExpDialog={openExpDialogUpdate}
            closeExp={handleCloseExpUpdate}
            openExp={handleClickOpenExpUpdate}
          />
          <Timeline>
            {props.profile && props.profile.experience.length > 0
              ? props.profile.experience.map((exp, i) => {
                  return (
                    <TimelineItem key={i} className={classes.LeftTimeLine}>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card key={i}>
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                          >
                            {(popupState) => (
                              <React.Fragment>
                                <IconButton
                                  className={classes.MoreVert}
                                  aria-label="settings"
                                  {...bindTrigger(popupState)}
                                >
                                  <MoreVert />
                                </IconButton>
                                <Menu
                                  id="simple-menu"
                                  {...bindMenu(popupState)}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleClickOpenExpUpdate();

                                      returnFn(exp);
                                    }}
                                  >
                                    Update
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => props.delExp(exp._id)}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </React.Fragment>
                            )}
                          </PopupState>
                          <CardContent>
                            <Typography component="h4" variant="subtitle1">
                              {exp.company}
                              {' - '} {exp.location}
                            </Typography>

                            <Typography component="h4" variant="caption">
                              {` ${dayjs(exp.from).format('MMMM , YYYY')} - 
                              ${
                                exp.current
                                  ? 'current'
                                  : dayjs(exp.to).format('MMMM , YYYY')
                              }`}
                            </Typography>
                            <Typography
                              component="h4"
                              variant="subtitle2"
                              onClick={() => console.log(exp)}
                            >
                              {exp.title}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body1"
                              color="textSecondary"
                            >
                              {exp.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })
              : 'No experience has been added yet 👻'}
          </Timeline>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <div className={classes.cardTitle}>
            <Typography variant="h5">Education</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpenEdu}
            >
              Add an education
            </Button>
          </div>
          <AddEducationDialog
            openEduDialog={openEduDialog}
            handleClickOpenEdu={openEduDialog}
            handleCloseEdu={handleCloseEdu}
          />

          <Timeline>
            {props.profile && props.profile.education.length > 0
              ? props.profile.education.map((edu, i) => {
                  return (
                    <TimelineItem key={i} className={classes.LeftTimeLine}>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card>
                          <CardContent>
                            <Typography display="block" variant="subtitle1">
                              {edu.school}
                            </Typography>
                            <Typography variant="subtitle2">
                              {edu.degree} degree at {edu.fieldofstudy}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              {dayjs(edu.from).format('MMMM , YYYY')} -{' '}
                              {edu.current
                                ? 'current'
                                : dayjs(edu.to).format('MMMM , YYYY')}
                            </Typography>

                            <Typography
                              component="p"
                              variant="body1"
                              color="textSecondary"
                            >
                              {edu.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })
              : 'No education has been added yet 👻'}
          </Timeline>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    profile: state.userProfile.profile,
  };
};
export default connect(mapStateToProps, { delExp })(History);
