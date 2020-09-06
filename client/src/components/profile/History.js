import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
  LeftTimeLine: {
    '&:before': {
      flex: 0,
      padding: 0,
    },
  },
}));
export default function History() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Experience
          </Typography>

          <Timeline>
            <TimelineItem className={classes.LeftTimeLine}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card>
                  <CardContent>
                    <Typography display="block" variant="subtitle2">
                      ORCLOUD (Web Developer)
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      Nov 2015 - Current
                    </Typography>

                    <hr></hr>
                    <Typography
                      component="p"
                      variant="body1"
                      color="textSecondary"
                    >
                      I am a Front End developer with industry experience
                      building websites and web applications. I specialize in
                      JavaScript I also have experience working on React. Take a
                      look at my work or get in
                    </Typography>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem className={classes.LeftTimeLine}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card>
                  <CardContent>
                    <Typography display="block" variant="subtitle2">
                      Microsoft (Systems Admin)
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      Da : Nov 2004 - Nov 2011
                    </Typography>

                    <hr></hr>
                    <Typography
                      component="p"
                      variant="body1"
                      color="textSecondary"
                    >
                      I am a Front End developer with industry experience
                      building websites and web applications. I specialize in
                      JavaScript I also have experience working on React. Take a
                      look at my work or get in
                    </Typography>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Study
          </Typography>

          <Timeline>
            <TimelineItem className={classes.LeftTimeLine}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card>
                  <CardContent>
                    <Typography display="block" variant="subtitle1">
                      University Of Washington
                    </Typography>
                    <Typography variant="subtitle2">
                      Masters degree at Computer Science
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      Sep 1993 - June 1999
                    </Typography>

                    <hr></hr>
                    <Typography
                      component="p"
                      variant="body1"
                      color="textSecondary"
                    >
                      I am a Front End developer with industry experience
                      building websites and web applications. I specialize in
                      JavaScript I also have experience working on React. Take a
                      look at my work or get in
                    </Typography>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </div>
  );
}
