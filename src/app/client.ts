import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    Accept: `application/json`,
    'Content-Type': `application/json`,
  },
});
