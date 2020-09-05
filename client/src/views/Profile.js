import React from 'react';
import { makeStyles, Grid, Container } from '@material-ui/core';

import Intro from '../components/profile/Intro';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Bio from '../components/profile/Bio';
import History from '../components/profile/History';
import Repos from '../components/profile/Repos';

const useStyles = makeStyles((theme) => ({}));
export default function Profile() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <Grid Container>
        <Grid item xs={9}>
          <Container>
            <Intro />
            <Bio />
            <History />
            <Repos />
          </Container>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
