import axios, {type AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/',
  timeout: 5000, // 5초 안에 응답 없으면 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;