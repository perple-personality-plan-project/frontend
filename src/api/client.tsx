import axios from 'axios';

const client = axios.create({ baseURL: process.env.REACT_APP_API });

client.interceptors.request.use(function (config: any) {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');

  config.headers['accessToken'] = accessToken;
  config.headers['authorization'] = refreshToken;
  return config;
});

export default client;
