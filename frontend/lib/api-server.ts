import { auth } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const serverApiClient = {
    get: async (endpoint: string) => {
        const { getToken } = await auth();
        const token = await getToken();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers,
            cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) {
            // Handle 404 gracefully or throw
            if (response.status === 404) return null;
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || error.message || 'API request failed');
        }

        return response.json();
    },
};
