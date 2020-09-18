import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export default function Toast(props) {
  const [open, setOpen] = React.useState(props.show);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  React.useEffect(() => {
    setOpen(props.show);
  }, [props.show]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.type}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}
