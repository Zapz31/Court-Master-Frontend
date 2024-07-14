import axios from 'axios';
import router from './router';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Đặt baseURL của bạn ở đây
  timeout: 10000,
  withCredentials: true, // Nếu bạn cần gửi cookies trong các yêu cầu cross-origin
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          router.push({ name: 'UnableAccessScreen' });
          break;

          case 400:
            router.push({ name: 'PageNotFoundScreen' });
            break;
        // Xử lý các mã lỗi khác ở đây nếu cần
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;