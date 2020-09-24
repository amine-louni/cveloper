import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions';
import AdvancedFormat from 'dayjs/plugin/advancedFormat'; // ES 2015

import dayjs from 'dayjs';
import {
  Button,
  Card,
  CardContent,
  makeStyles,
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

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
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
          <Timeline>
            {props.profile
              ? props.profile.experience.map((exp) => {
                  return (
                    <TimelineItem className={classes.LeftTimeLine}>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card>
                          <CardContent>
                            <Typography display="block" variant="subtitle2">
                              {exp.company} ({exp.title})
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              {dayjs(exp.from).format('MMMM , YYYY')} -{' '}
                              {exp.current
                                ? 'current'
                                : dayjs(exp.to).format('MMMM , YYYY')}
                            </Typography>

                            <hr></hr>
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
              : 'not found'}
          </Timeline>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <div className={classes.cardTitle}>
            <Typography variant="h5">Study</Typography>
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
            {props.profile
              ? props.profile.education.map((edu) => {
                  return (
                    <TimelineItem className={classes.LeftTimeLine}>
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

                            <hr></hr>
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
              : 'loading'}
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
export default connect(mapStateToProps, { getCurrentUserProfile })(History);
