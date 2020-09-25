import axios from 'axios';
import { auth, profile } from '../http';

const setAuthToken = (token) => {
  if (token) {
    console.log('set token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    profile.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('delete token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
