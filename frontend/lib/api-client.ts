import { useAuth } from '@clerk/nextjs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const useApiClient = () => {
    const { getToken } = useAuth();

    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
        const token = await getToken();

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('[API Client] Request failed:', { status: response.status, endpoint, error });

            let errorMessage = error.message || `API request failed: ${response.status}`;

            if (error.detail) {
                if (typeof error.detail === 'string') {
                    errorMessage = error.detail;
                } else if (Array.isArray(error.detail)) {
                    // Handle Pydantic validation errors
                    errorMessage = error.detail
                        .map((e: any) => `${e.loc?.join('.') || 'field'} - ${e.msg}`)
                        .join('\n');
                } else if (typeof error.detail === 'object') {
                    errorMessage = JSON.stringify(error.detail, null, 2);
                }
            }

            throw new Error(errorMessage);
        }

        return response.json();
    };

    return {
        get: (endpoint: string) => fetchWithAuth(endpoint, { method: 'GET' }),
        post: (endpoint: string, body: any) => fetchWithAuth(endpoint, { method: 'POST', body: JSON.stringify(body) }),
        put: (endpoint: string, body: any) => fetchWithAuth(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
        patch: (endpoint: string, body: any) => fetchWithAuth(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
        delete: (endpoint: string) => fetchWithAuth(endpoint, { method: 'DELETE' }),
    };
};
