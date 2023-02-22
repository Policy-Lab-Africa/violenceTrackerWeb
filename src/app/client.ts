import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    Accept: `application/json`,
    'Content-Type': `application/json`,
  },
});
