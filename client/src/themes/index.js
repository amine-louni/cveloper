import { createMuiTheme } from '@material-ui/core/styles';

import { indigo, teal, blue, red } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
