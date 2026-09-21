import axios from 'axios';

/**
 * Normalized backend API base URL.
 * Falls back to http://localhost:5000 for local development.
 * Automatically strips trailing slashes and any trailing '/api' to prevent malformed routes.
 */
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

let cleanUrl = rawBaseUrl.trim().replace(/\/+$/, '');
if (cleanUrl.endsWith('/api')) {
  cleanUrl = cleanUrl.slice(0, -4);
}

export const API_BASE_URL = cleanUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
