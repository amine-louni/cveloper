import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../assets/img/default.jpg';
const useStyles = makeStyles((theme) => ({
  root: { marginTop: '2rem' },
}));

export default function MyCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={defaultAvatar} />}
        title="John Doe"
        subheader="@john_doe"
      />
    </Card>
  );
}
