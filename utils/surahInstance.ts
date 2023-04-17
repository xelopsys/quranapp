import axios from 'axios';
import { store } from 'context';
import humps from 'humps';
import { decamelize } from '../helpers';
import i18n from 'i18n';
import Toast from 'react-native-toast-message';
import { surahUrl } from 'constants/settings';

const axiosInstance = axios.create({
  baseURL: surahUrl,
  transformResponse: [...(axios.defaults.transformResponse as any), humps.camelizeKeys],
  transformRequest: [decamelize, ...(axios.defaults.transformRequest as any)],
});

// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
// axiosInstance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
// axiosInstance.defaults.headers.get.Accept = 'application/json';

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //   case 422:
    //   case 403:
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message || 'Something went wrong',
    });
    //     break;

    //   default:
    //     break;
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
