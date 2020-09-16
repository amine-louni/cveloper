import React from 'react';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Container, Divider, Grid, Typography } from '@material-ui/core';
import PostInput from '../components/Post/PostInput';
import Post from '../components/Post/Post';
import MyCard from '../components/common/myCard';
import MyAside from '../components/common/MyAside';

export default function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <MyCard />

            <MyAside />
          </Grid>

          <Grid item md={6}>
            <PostInput />
            <Post />
            <Post />
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
