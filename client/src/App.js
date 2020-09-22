import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Home from './views/Home';
import Profile from './views/Profile';
import Register from './views/Register';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';
import MyAccount from './views/Myaccount';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';

import { indigo, teal } from '@material-ui/core/colors';
import Dashboard from './views/Dashboard';
import Toast from './components/common/Toast';
import { loadUser } from './actions/authHandler';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  console.log('token found!');
  setAuthToken(localStorage.token);
}
function App({ isDark, loadUser }) {
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
  React.useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Toast />
        <Switch>
          <Route path="/me" component={Profile} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ isDark }) => {
  return { isDark };
};
export default connect(mapStateToProps, { loadUser })(App);
