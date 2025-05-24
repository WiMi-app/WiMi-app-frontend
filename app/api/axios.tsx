import axios from 'axios';
const BASE_URL = 'https://wimi-app-backend-999646107030.us-east5.run.app';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});