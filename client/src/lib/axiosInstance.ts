import axios, {type AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // 스프링 부트 서버 주소
  timeout: 5000, // 5초 안에 응답 없으면 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;