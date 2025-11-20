import { auth } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type FetchOptions = RequestInit & {
    skipAuth?: boolean;
};

export const serverApiClient = {
    fetch: async (endpoint: string, options: FetchOptions = {}) => {
        const { skipAuth = false, ...fetchOptions } = options;
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
        };

        if (!skipAuth) {
            const { getToken } = await auth();
            const token = await getToken();
            if (token) {
                (headers as any)['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...fetchOptions,
            headers,
            cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('[API Client] Request failed:', { status: response.status, url: endpoint, error });

            let errorMessage = error.message || `API request failed: ${response.status}`;

            if (error.detail) {
                if (typeof error.detail === 'string') {
                    errorMessage = error.detail;
                } else if (Array.isArray(error.detail)) {
                    // Handle Pydantic validation errors
                    errorMessage = error.detail
                        .map((e: any) => `${e.loc?.join('.')} - ${e.msg}`)
                        .join('\n');
                } else if (typeof error.detail === 'object') {
                    errorMessage = JSON.stringify(error.detail, null, 2);
                }
            }

            throw new Error(errorMessage);
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return null;
        }

        return response.json();
    },

    get: async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
        return serverApiClient.fetch(endpoint, { ...options, method: 'GET' });
    },

    post: async <T>(endpoint: string, body: any, options: FetchOptions = {}): Promise<T> => {
        return serverApiClient.fetch(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    patch: async <T>(endpoint: string, body: any, options: FetchOptions = {}): Promise<T> => {
        return serverApiClient.fetch(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    },

    delete: async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
        return serverApiClient.fetch(endpoint, { ...options, method: 'DELETE' });
    },
};
