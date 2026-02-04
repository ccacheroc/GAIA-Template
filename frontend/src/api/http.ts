import axios from 'axios';

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
// Centralized axios instance with base URL from environment variables.
const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8005',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http;
