import axios from 'axios';

export const auth = axios.create({
  baseURL: 'http://localhost:9000/api/v1/auth/',
  headers: { 'Content-type': 'application/json' },
});
