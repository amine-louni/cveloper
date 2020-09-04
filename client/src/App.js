import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultTheme, darkTheme } from './themes/index';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route path="/feed" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
