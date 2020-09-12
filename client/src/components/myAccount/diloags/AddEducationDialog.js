import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Switch } from 'formik-material-ui';
import { Box, Button, FormControlLabel } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';

import * as Yup from 'yup';

export default function AddEducationDialog({ openEduDialog, handleCloseEdu }) {
  const initialValues = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: new Date(),
    to: new Date(),
    description: '',
    current: false,
  };

  const validationSchema = Yup.object({
    school: Yup.string(),
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      console.log('add education');
      alert(JSON.stringify(values, null, 2));
      handleCloseEdu();
    }, 500);
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={openEduDialog}
      onClose={handleCloseEdu}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, touched, errors, values }) => (
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DialogTitle id="form-dialog-title">
                Add and education
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add any school, bootcamp, etc that you have attended
                  {/* {values.current ? 'current' : 'false'} */}
                </DialogContentText>
                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="school"
                    label="School"
                  ></Field>
                </Box>

                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="degree"
                    label="Degree"
                  ></Field>
                </Box>

                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="fieldofstudy"
                    label="Field of study"
                  ></Field>
                </Box>
                <Box mt={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={DatePicker}
                    name="from"
                    label="From"
                  />
                </Box>
                <Box mb={3}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        type="checkbox"
                        name="current"
                      />
                    }
                    label="Currently here"
                  />
                </Box>
                <Box mt={3}>
                  <Field
                    disabled={values.current}
                    style={{ width: '100%' }}
                    component={DatePicker}
                    name="to"
                    label="to"
                  />
                </Box>
                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    multiline
                    rows={4}
                    type="text"
                    name="description"
                    label="Description"
                  ></Field>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={handleCloseEdu}>
                  CANCEL
                </Button>
                <Button color="primary" type="submit">
                  ADD
                </Button>
              </DialogActions>
            </MuiPickersUtilsProvider>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
