import React from 'react';
import { post } from './../http';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Container, Grid, Typography } from '@material-ui/core';
import PostInput from '../components/Post/PostInput';
import Post from '../components/Post/Post';
import MyCard from '../components/common/myCard';
import MyAside from '../components/common/MyAside';
import PostCardSm from '../components/common/postCardSm';

export default function Home() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await post.get('/');
        setPosts(res.data.data.docs);
      } catch (err) {
        return <h4>Ops some thing went wrong , refresh the page 🙄</h4>;
      }
    };

    getPosts();
  }, []);
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: 27 }}>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <MyCard />

            <MyAside />
          </Grid>

          <Grid item md={6}>
            <PostInput />
            {posts.map((post) => (
              <Post
                user={`${post.user.firstName}  ${post.user.lastName}`}
                createdAt={post.createdAt}
                cover={post.cover}
                title={post.title}
                tags={post.tags}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              Trending{' '}
              <span role="img" aria-label="fires">
                🔥🔥
              </span>
            </Typography>
            <PostCardSm />
            <PostCardSm />
            <PostCardSm />
            <PostCardSm />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
