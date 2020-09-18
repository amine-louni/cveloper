import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Footer from '../components/common/Footer';
import Toast from '../components/common/Toast';

import { auth } from '../http';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  alert: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const login = async (body) => {
    try {
      const res = await auth.post('/login', body);
      if (res.data.status === 'success') {
        console.log('success', 'logged in with success 👌');
        setOpen(true);
        setTimeout(() => {
          window.location.assign('/');
        }, 1500);
      }
    } catch (err) {
      setOpenErr(true);
      console.log('error', err.response.data.message);
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Required field')
      .email('Enter a valid email please'),
    password: Yup.string().required('Required field').min(8),
  });
  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {openErr ? (
              <Alert severity="error" className={classes.alert}>
                <AlertTitle>Authentication Error</AlertTitle>
                <p>Wrong Email or password</p>
                <RouterLink to="/forgot-password">
                  <Link variant="body2">Forgot your password ?</Link>
                </RouterLink>{' '}
              </Alert>
            ) : (
              ''
            )}

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log('values', values);
                login(values);
              }}
            >
              {({ submitForm, isSubmitting, touched, errors }) => (
                <Form className={classes.form} noValidate>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Log in
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <RouterLink to="/register">
                        <Link variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </RouterLink>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Footer />
                  </Box>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
      <Toast show={open} type="success" text="You login successfully 👌👌" />
    </>
  );
}
