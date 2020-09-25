import React from 'react';
import { connect } from 'react-redux';
import { Card, makeStyles, Typography, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
}));
function Bio(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body2">
          {(props.profile && props.profile.bio) || '404 bio not found 🙊🙉🙈'}
        </Typography>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    profile: state.userProfile.profile,
  };
};
export default connect(mapStateToProps)(Bio);
