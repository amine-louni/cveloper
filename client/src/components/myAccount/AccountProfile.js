import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import MuiTextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import CheckBox from '@material-ui/core/Checkbox';
import { Autocomplete, ToggleButtonGroup } from 'formik-material-ui-lab';

import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch,
} from 'formik-material-ui';

import {
  Card,
  CardContent,
  Checkbox,
  InputLabel,
  LinearProgress,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

  const initialValues = {
    company: '',
    website: '',
    status: '',
    location: '',
    skills: [],
    githubUsername: '',
    personName: '',
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            render={({ submitForm, isSubmitting, touched, errors }) => (
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
                    name="autocomplete"
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
          />
        </CardContent>
      </Card>
    </div>
  );
}
