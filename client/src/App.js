import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultTheme, darkTheme } from './themes/index';
import Home from './views/Home';
import Profile from './views/Profile';
import Register from './views/Register';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';
import MyAccount from './views/Myaccount';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';

import { indigo, teal } from '@material-ui/core/colors';

function App({ isDark }) {
  const defaultTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: indigo,
      secondary: teal,
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: indigo,
      secondary: teal,
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });
  let theme = isDark ? darkTheme : defaultTheme;
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route path="/feed" component={Home} />
          <Route path="/me" component={Profile} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ isDark }) => {
  return { isDark };
};
export default connect(mapStateToProps, null)(App);
