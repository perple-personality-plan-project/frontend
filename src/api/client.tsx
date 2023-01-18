import axios from 'axios';

// const client = axios.create({ baseURL: process.env.REACT_APP_API });

const client = axios.create({ baseURL: process.env.REACT_APP_API });

client.interceptors.request.use(function (config: any) {
  //   console.log(config);
  //   const user = localStorage.getItem('user');
  //   const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log(config);
  //   if (!user) {
  //     config.headers['accessToken'] = null;
  //     config.headers['refreshToken'] = null;
  //     return config;
  //   }
  //   const { accessToken, refreshToken } = JSON.parse(user);
  //   config.headers['accessToken'] = accessToken;
  config.headers['authorization'] = refreshToken;
  return config;
});

// client.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response;
//   },
//   async function (error) {
//     if (error.response && error.response.status === 403) {
//       try {
//         const originalRequest = error.config;
//         const data = await client.get('/user/refresh-token');
//         console.log(data);
//         //   if (data) {
//         //       const {accessToken, refreshToken} = data.data
//         //       localStorage.removeItem('user')
//         //       localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
//         //       originalRequest.headers['accessToken'] = accessToken;
//         //       originalRequest.headers['refreshToken'] = refreshToken;
//         //       return await client.request(originalRequest);
//         //       }
//       } catch (error) {
//         localStorage.removeItem('user');
//         console.log(error);
//       }
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   },
// );

export default client;
