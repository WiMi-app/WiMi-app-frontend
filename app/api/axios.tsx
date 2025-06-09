import axios from 'axios';
const LOCALHOST = 'https://localhost:8000';
const BASE_URL = 'https://wimi-app-backend-999646107030.us-east5.run.app/api/v0';

export default axios.create({
    baseURL: BASE_URL,
    timeout: 5000, //5 second timeout
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});