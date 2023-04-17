import axios from 'axios';
import { store } from 'context';
import i18n from 'i18n';
import Toast from 'react-native-toast-message';
import { ayatUrl } from 'constants/settings';

// const formatErrorResponse = (errors: Record<string, string>) => {
//   let errorsString = '';
//   for (const key in errors) {
//     errorsString += errors[key][0].toString();
//   }
//   return errorsString;
// };

const axiosInstance = axios.create({
  baseURL: ayatUrl,
});

// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
// axiosInstance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
// axiosInstance.defaults.headers.get.Accept = 'application/json';

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers['Accept-Language'] = i18n.locale;
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
    // alert(JSON.stringify(data));
    return Promise.reject(error);
  }
);

export default axiosInstance;
