import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error mapping (e.g., 401 logout)
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Trigger logout flow if needed
            console.error('Session expired');
        }
        return Promise.reject(error);
    }
);
