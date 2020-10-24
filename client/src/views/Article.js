import React from 'react';
import { post } from '../http';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import PostPreview from '../components/common/postPreview/PostPreview';

import defaultAvatar from '../assets/img/default.jpg';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  media: {
    height: 340,
  },
  body: {
    fontFamily: 'Segoe UI',
  },
}));

export default function Article(props) {
  const [loading, setLoading] = React.useState(true);
  const [article, setArticle] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const res = await post.get(`/slug/${props.match.params.slug}`);

      const article = res.data.data.data;
      document.title = article.title;
      setArticle(article);
      setLoading(false);
    })();
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={9}>
            <Card>
              {loading ? (
                <Skeleton variant="rect" height={340} />
              ) : (
                <CardMedia
                  className={classes.media}
                  image={`http://localhost:9000/${article.cover}`}
                  title="Contemplative Reptile"
                />
              )}
              <CardContent>
                <Box mb={4}>
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    article.tags.map((tag) => (
                      <Chip
                        className={classes.skill}
                        size="small"
                        label={tag}
                      />
                    ))
                  )}
                </Box>
                <Typography gutterBottom variant="h4" component="h1">
                  {loading ? <Skeleton variant="text" /> : article.title}
                </Typography>
                <Typography component="p" className={classes.body}>
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    <PostPreview markdown={article.text} />
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardHeader
                avatar={<Avatar variant="rounded" src={defaultAvatar} />}
                title={`${
                  loading ? <Skeleton variant="text" /> : article.user.firstName
                }   ${
                  loading ? <Skeleton variant="text" /> : article.user.lastName
                } `}
                subheader={
                  loading ? <Skeleton variant="text" /> : article.user.userName
                }
              />
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Follow
                </Button>
              </CardActions>
              <CardContent>
                <span role="img" aria-label="calendar">
                  📅
                </span>{' '}
                Joined :{' '}
                {loading ? (
                  <Skeleton variant="text" />
                ) : (
                  dayjs(article.createdAt).format('DD/MM/YYYY')
                )}{' '}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
