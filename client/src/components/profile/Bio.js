import React from 'react';
import { Card, makeStyles, Typography, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
}));
export default function Bio() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body2">
          I am a Front End developer with industry experience building websites
          and web applications. I specialize in JavaScript I also have
          experience working on React. Take a look at my work or get in touch!
          https://amine-louni.netlify.com/
        </Typography>
      </CardContent>
    </Card>
  );
}
