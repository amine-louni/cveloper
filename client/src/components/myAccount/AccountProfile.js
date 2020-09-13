import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import MuiTextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import Box from '@material-ui/core/Box';
import { Autocomplete } from 'formik-material-ui-lab';

import AddEducationDialog from './diloags/AddEducationDialog';
import AddExperienceDialog from './diloags/AddExperienceDialog';

import { TextField } from 'formik-material-ui';

import { Card, CardContent, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
export default function AccountProfile() {
  const classes = useStyles();
  const [openEduDialog, setOpenEduDialog] = React.useState(false);
  const [openExpDialog, setOpenExpDialog] = React.useState(false);
  const handleClickOpenEdu = () => {
    setOpenEduDialog(true);
  };
  const handleCloseEdu = () => {
    setOpenEduDialog(false);
  };

  const handleClickOpenExp = () => {
    setOpenExpDialog(true);
  };
  const handleCloseExp = () => {
    setOpenExpDialog(false);
  };
  const initialValues = {
    company: '',
    website: '',
    status: '',
    location: '',
    skills: [],
    githubUsername: '',
    personName: '',
    name: '',
  };
  const validationSchema = Yup.object({
    company: Yup.string().required('Required field'),
    website: Yup.string().matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    }, 500);
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Typography align="center" variant="h5" component="h2">
            About me
          </Typography>
          <Typography align="center" variant="body2">
            Let's get some information to make your profile stand out
          </Typography>
        </CardContent>
      </Card>
      <div style={{ marginTop: 25, marginBottom: 25 }}></div>
      <Card>
        <CardContent>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenExp}
          >
            Add an experience
          </Button>
          <AddExperienceDialog
            openExpDialog={openExpDialog}
            closeExp={handleCloseExp}
            openExp={handleClickOpenExp}
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenEdu}
          >
            Add an education
          </Button>
          <AddEducationDialog
            openEduDialog={openEduDialog}
            handleClickOpenEdu={openEduDialog}
            handleCloseEdu={handleCloseEdu}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, touched, errors }) => (
              <Form>
                {isSubmitting && <LinearProgress />}

                <FormControl className={classes.formControl}>
                  <Field
                    component={TextField}
                    type="text"
                    name="status"
                    label="Status"
                    select
                    helperText="Give us an idea of where you are at in your career"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem value={'developer'}>Developer</MenuItem>
                  </Field>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Field
                    component={TextField}
                    type="company"
                    label="Company"
                    name="company"
                    helperText="Could be your own company or one you work for"
                  />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <Field
                    component={TextField}
                    type="location"
                    label="location"
                    name="location"
                    helperText="City & state suggested (eg. Boston, MA)"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Field
                    name="skills"
                    multiple
                    component={Autocomplete}
                    options={names}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        error={touched['skills'] && !!errors['skills']}
                        helperText={
                          (touched['skills'] && errors['skills']) ||
                          'Enter your skills'
                        }
                        label="Skills *"
                      />
                    )}
                  />
                </FormControl>
                <Box mt={4}>
                  <Button variant="contained" color="primary" type="submit">
                    submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
