import axios from 'axios';
import swal from 'sweetalert';

import { BASE_URL } from '../utils/constants';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
    if (!config.url.endsWith('sessions') || !config.url.endsWith('users')
      || !config.url.endsWith('recovery')) {
      const token = localStorage.getItem('token');

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use((response) => response, (error) => {
  const { config, status } = error.response;

  if (config.url !== '/sessions' && config.url !== '/users'
    && config.url !== '/recovery' && status === 401) {
    return swal({
      title: 'Session Expired',
      text: 'Your session has expired! Please sign in again to continue using the system',
      icon: 'warning'
    }).then(() => {
      localStorage.clear();
      window.location.reload();
    });
  }

  return Promise.reject(error);
});

export default api;