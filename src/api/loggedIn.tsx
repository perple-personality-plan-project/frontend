import axios from 'axios';

// const client = axios.create({ baseURL: process.env.REACT_APP_API });

const loggedIn = axios.create({ baseURL: process.env.REACT_APP_API });

loggedIn.interceptors.request.use(function (config: any) {
  //   console.log(config);
  //   const user = localStorage.getItem('user');
  const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   console.log(config);
  //   if (!user) {
  //     config.headers['accessToken'] = null;
  //     config.headers['refreshToken'] = null;
  //     return config;
  //   }
  //   const { accessToken, refreshToken } = JSON.parse(user);
  config.headers['authorization'] = accessToken;
  //   config.headers['authorization'] = refreshToken;
  return config;
});

// loggedIn.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response;
//   },
//   async function (error) {
//     if (error.response && error.response.status === 403) {
//       try {
//         const originalRequest = error.config;
//         const data = await loggedIn.get('/user/refresh-token');
//         console.log(data);
//         //   if (data) {
//         //       const {accessToken, refreshToken} = data.data
//         //       localStorage.removeItem('user')
//         //       localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
//         //       originalRequest.headers['accessToken'] = accessToken;
//         //       originalRequest.headers['refreshToken'] = refreshToken;
//         //       return await loggedIn.request(originalRequest);
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

export default loggedIn;
