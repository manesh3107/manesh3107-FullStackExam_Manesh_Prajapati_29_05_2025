import axios from 'axios';

const api = axios.create({
  baseURL: 'https://manesh3107-fullstackexam-manesh.onrender.com/api/v1', // backend URL
  withCredentials: true, // if you’re using cookies
});

export default api;
