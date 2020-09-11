import React from 'react';
import { Card, CardContent, Button } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

export default function AccountInfos() {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography align="center" variant="h5" component="h2">
            Personal informations
          </Typography>
        </CardContent>
      </Card>
      <div style={{ marginTop: 25, marginBottom: 25 }}></div>
      <Card>
        <CardContent>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  value="John"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value="Doe"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value="John@doe.com"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 15,
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Update me
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card style={{ marginTop: 30 }}>
        <CardContent>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password-confirm"
                  label="Password confirmation"
                  type="password"
                  id="password-confirm"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 15,
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Update password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
