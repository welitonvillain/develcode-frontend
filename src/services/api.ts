import axios from 'axios';

export const BASE_URL = "http://localhost:8081/";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;