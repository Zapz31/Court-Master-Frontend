import axios from 'axios';
import router from './router';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Đặt baseURL của bạn ở đây
  timeout: 10000, // Khoảng thời gian tối đa client chờ đợi phản hồi từ server. Nếu quá thời gian này mà client vẫn chưa nhận được response thì 
                 // Axios sẽ tự động hủy bỏ request và trả về lỗi sẽ có mã 'ECONNABORTED' cho các lỗi timeout. 
  withCredentials: true, // Nếu bạn cần gửi cookies trong các yêu cầu cross-origin
});

axiosInstance.interceptors.response.use( // interceptors này hoạt động như một bộ xử lý lỗi toàn cục cho tất cả các response nhận được bởi thể hiện Axios này.
  (response) => response, // Chỗ này xử lý các response thành công.
  (error) => { // nếu request thất bại thì sẽ được xử lý ở chỗ này. (lỗi mạng, timeout hoặc mã trạng thái không phải 2xx).
    if (error.response) { // Kiểm tra xem lỗi có thuộc tính response không. Điều này cho biết server đã phản hồi với một trạng thái lỗi. 
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