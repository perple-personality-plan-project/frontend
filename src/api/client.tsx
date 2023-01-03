import axios from 'axios';

const client = axios.create({ baseURL: process.env.REACT_APP_API });

export const nonTokenClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

// client.interceptors.request.use(config => {
//   const accessToken = localStorage.getItem('accessToken');
//   config.headers['token'] = `${accessToken}`;
//   return config;
// });

export default client;
