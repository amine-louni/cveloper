import React, { useState } from 'react';
import { post } from '../../http';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import PostPreview from './postPreview/PostPreview';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(7),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    display: 'none',
  },
  updateCover: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: '4em',
      marginLeft: '2em',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CreatePostDialog(props) {
  const { open, handleClose, handleOpen } = props;
  const classes = useStyles();
  const [photoUploadProgress, setPhotoUploadProgress] = useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [markdown, setMarkdown] = React.useState('');
  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create a post{' '}
              <span role="img" aria-label="pen">
                📝
              </span>
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <AppBar position="static" variant="outlined" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Write" {...a11yProps(0)} />
              <Tab label="Preview" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container>
              <Grid item md={9}>
                <Card variant="outlined">
                  <CardContent>
                    <Formik
                      initialValues={{
                        cover: '',
                        title: '',
                        tags: '',
                        post: markdown,
                      }}
                      //validationSchema={validationSchema}
                      onSubmit={async (values, { setSubmitting }) => {
                        // await props.login(values);
                        setSubmitting(false);
                      }}
                    >
                      {({
                        submitForm,
                        isSubmitting,
                        touched,
                        errors,
                        setFieldValue,
                        values,
                      }) => (
                        <Form className={classes.form} noValidate>
                          <div className={classes.updateCover}>
                            {values.cover ? (
                              <img src={values.cover} alt="cover" />
                            ) : (
                              ''
                            )}
                            <input
                              accept="image/*"
                              className={classes.input}
                              id="contained-button-file"
                              name="cover"
                              type="file"
                              onChange={async (event) => {
                                setFieldValue(
                                  'cover',
                                  URL.createObjectURL(event.target.files[0])
                                );

                                const form = new FormData();

                                form.append('cover', event.target.files[0]);
                                await post.post('update-post-cover', form, {
                                  onUploadProgress: function (progressEvent) {
                                    var percentCompleted = Math.round(
                                      (progressEvent.loaded * 100) /
                                        progressEvent.total
                                    );
                                    setPhotoUploadProgress(
                                      Math.round(
                                        (progressEvent.loaded * 100) /
                                          progressEvent.total
                                      )
                                    );
                                  },
                                });
                              }}
                            />
                            <label htmlFor="contained-button-file">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Upload a cover image
                              </Button>
                            </label>
                          </div>
                          <Field
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                          />
                          <Field
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            id="tags"
                            label="Tags"
                            helperText="Tags [Add up to 4 tags]"
                            name="tags"
                            autoComplete="tags"
                            autoFocus
                          />
                          <Field
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="post"
                            rows={7}
                            label="Type here ... ✍"
                            name="post"
                            autoComplete="post"
                            autoFocus
                          />
                          {setMarkdown(values.post)}
                        </Form>
                      )}
                    </Formik>
                  </CardContent>
                </Card>
                <Grid item md={3}></Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PostPreview markdown={markdown} />
          </TabPanel>
        </Container>
      </Dialog>
    </div>
  );
}
