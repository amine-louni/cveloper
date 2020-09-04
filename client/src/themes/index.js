import { createMuiTheme } from '@material-ui/core/styles';

import { indigo, teal } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  type: 'light',
  palette: {
    primary: indigo,
    secondary: teal,
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export const darkTheme = createMuiTheme({
  type: 'dark',
  palette: {
    primary: indigo,
    secondary: teal,
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
