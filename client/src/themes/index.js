import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';

export const defaultTheme = createMuiTheme({
  type: 'light',
  palette: {
    primary: deepPurple,
    secondary: teal,
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export const darkTheme = createMuiTheme({
  type: 'dark',
  palette: {
    primary: deepPurple,
    secondary: teal,
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
