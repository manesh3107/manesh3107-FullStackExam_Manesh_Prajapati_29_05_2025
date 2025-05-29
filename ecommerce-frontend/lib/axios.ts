import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // backend URL
  withCredentials: true, // if you’re using cookies
});

export default api;
