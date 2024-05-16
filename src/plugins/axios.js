import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your base URL
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axiosInstance;
    app.provide('axios', axiosInstance);
  }
};