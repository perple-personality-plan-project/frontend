import axios from 'axios';

const nonTokenClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default nonTokenClient;
