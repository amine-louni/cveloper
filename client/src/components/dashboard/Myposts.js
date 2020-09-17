import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PostCardSm from '../common/postCardSm';

const useStyles = makeStyles({
  root: {
    minHeight: 400,
  },
  empty: {
    height: 400,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ height: '100%' }}>
        {/* <div className={classes.empty}>
          <Typography variant="h5">
            {' '}
            You have 0 posts , try to write some 🙄🙄
          </Typography>
                  
              </div> */}

        <PostCardSm />
      </CardContent>
    </Card>
  );
}
