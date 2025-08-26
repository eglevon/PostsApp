import { create } from 'zustand';
import api from '../lib/axios';
import axios, { AxiosError } from 'axios';
import type { AuthState, SignUpData } from '../types/SignUpData';
import type { User } from '../types/User';

const API_URL = import.meta.env.VITE_API_URL;

function persistAuth(user: User, accessToken: string, refreshToken: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

function clearAuth() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const useAuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    loading: false,
    error: null,

    signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post('/auth/login', { email, password });
            const { accessToken, refreshToken, user } = res.data;

            persistAuth(user, accessToken, refreshToken);
            set({ accessToken, refreshToken, user, loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<{ message?: string }>;
                set({
                    error: axiosError.response?.data?.message || axiosError.message,
                    loading: false,
                });
            } else {
                set({ error: 'Login failed', loading: false });
            }
        }
    },

    signUp: async (data: SignUpData) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post('/auth/signup', data);
            const { accessToken, refreshToken } = res.data;

            function decodeJWT(token: string) {
                const payload = token.split('.')[1];
                const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
                return JSON.parse(decoded);
            }

            const decoded = decodeJWT(accessToken);

            const user: User = {
                id: decoded.userId,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
            };

            persistAuth(user, accessToken, refreshToken);
            set({ accessToken, refreshToken, user, loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<{ message?: string }>;
                set({
                    error: axiosError.response?.data?.message || axiosError.message,
                    loading: false,
                });
            } else {
                set({ error: 'Signup failed', loading: false });
            }
        }
    },

    signOut: () => {
        clearAuth();
        set({ accessToken: null, refreshToken: null, user: null });
    },

    refreshAccessToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) return null;

            const res = await axios.post(`${API_URL}/auth/refresh-token`, { token: refreshToken });
            const { accessToken } = res.data;

            localStorage.setItem('accessToken', accessToken);
            set({ accessToken });

            return accessToken;
        } catch (err) {
            console.error('Failed to refresh token:', err);
            clearAuth();
            set({ accessToken: null, refreshToken: null, user: null });
            return null;
        }
    },
}));
