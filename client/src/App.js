import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultTheme, darkTheme } from './themes/index';
import Home from './views/Home';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
