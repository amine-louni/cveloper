import React from 'react';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Container, Grid, Typography } from '@material-ui/core';
import PostInput from '../components/Post/PostInput';
import Post from '../components/Post/Post';
export default function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={4}>
          <Grid item md={3}></Grid>

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
