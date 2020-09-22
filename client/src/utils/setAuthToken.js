import axios from 'axios';
import { auth } from '../http';

const setAuthToken = (token) => {
  if (token) {
    console.log('set token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(axios.defaults.headers.common);
  } else {
    console.log('delete token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
