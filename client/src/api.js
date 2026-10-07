const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function getToken() {
    return localStorage.getItem('token');
}

export function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

export async function api(path, options = {}) {
    const res = await fetch(`${API}${path}`, {
        headers: authHeaders(),
        ...options,
    });
    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

export default API;
