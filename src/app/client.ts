import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `https://dev.violencetrack.ng/api`,
  headers: {
    Accept: `application/json`,
    'Content-Type': `application/json`,
  },
});
