import axios from 'axios';
import client from './client';
import { useNavigate } from 'react-router';
// const client = axios.create({ baseURL: process.env.REACT_APP_API });

const loggedIn = axios.create({ baseURL: process.env.REACT_APP_API });

loggedIn.interceptors.request.use(function (config: any) {
  const accessToken = sessionStorage.getItem('accessToken');
  config.headers['authorization'] = accessToken;

  return config;
});

loggedIn.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  async function (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      console.log('expired');
      try {
        const originalRequest = error.config;
        const { data } = await client.get('/api/user/refresh-token');

        if (data) {
          const { accessToken } = data.data;
          sessionStorage.removeItem('accessToken');
          sessionStorage.setItem('accessToken', accessToken);
          originalRequest.headers['accessToken'] = accessToken;
          //       originalRequest.headers['refreshToken'] = refreshToken;
          return await loggedIn.request(originalRequest);
        }
      } catch (error) {
        console.log(error);
        sessionStorage.clear();
        alert('로그인이 필요한 서비스입니다!');
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  },
);

export default loggedIn;
