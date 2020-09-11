import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function AddEducationDialog({ openEduDialog, handleCloseEdu }) {
  const initialValues = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: new Date(),
    to: new Date(),
    description: '',
  };

  const validationSchema = Yup.object({
    school: Yup.string(),
    degree: Yup.string().matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      console.log('add education');
      alert(JSON.stringify(values, null, 2));
    }, 500);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={openEduDialog}
              onClose={handleCloseEdu}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Add and education
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add any school, bootcamp, etc that you have attended
                </DialogContentText>
                <Field
                  component={TextField}
                  type="text"
                  name="school"
                  label="school"
                  helperText="Give us an idea of where you are at in your career"
                ></Field>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdu} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  ADD
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </div>
  );
}
