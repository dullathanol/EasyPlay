import axios from 'axios';
import pinia from '@/stores';
import { useUserStore } from '@/stores/modules/userStore';

const userStore = useUserStore(pinia);

const request = axios.create({
  timeout: 30000,
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_URL,
});

request.interceptors.request.use(
  (config) => {
    if (userStore.cookie) {
      config.headers.cookie = userStore.cookie;
    }
    return config;
  },
  (error) => {
    console.log(error);
  },
);

request.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    console.log(error);
  },
);

export default request;
