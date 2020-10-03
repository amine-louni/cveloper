import React from 'react';
import { connect } from 'react-redux';
import { updateMe } from '../../actions';

import { Card, CardContent, Button } from '@material-ui/core';
//import MUITextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';
// Formik Dependencies
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is a required field'),
  lastName: Yup.string().required('Last name is a required field'),
  userName: Yup.string().required('User name of study is a required field'),
  email: Yup.string()
    .required('Email is a required field')
    .email('Please enter a valid email format 🙏'),
});

function AccountInfos(props) {
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
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName:
                props.loading && props.user === null
                  ? ''
                  : props.user.firstName,
              lastName:
                props.loading && props.user === null ? '' : props.user.lastName,
              userName:
                props.loading && props.user === null ? '' : props.user.userName,
              email:
                props.loading && props.user === null ? '' : props.user.email,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await props.updateMe(JSON.stringify(values));
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, touched, errors, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
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
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                  >
                    {isSubmitting ? 'Updating ... 🔃' : '  Update me'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      {/* <Card style={{ marginTop: 30 }}>
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
      </Card> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};
export default connect(mapStateToProps, { updateMe })(AccountInfos);
