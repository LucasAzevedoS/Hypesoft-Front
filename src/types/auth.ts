export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
}

export interface LoginError {
    error: string;
    details?: string;
    message?: string;
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface RefreshTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
}

export interface User {
    username: string;
    email?: string;
    name?: string;
    roles: string[];
    sub?: string;
    preferred_username?: string;
    exp?: number;
    iat?: number;
}

export interface JWTPayload {
    sub: string;
    preferred_username?: string;
    email?: string;
    name?: string;
    realm_access?: {
        roles: string[];
    };
    exp: number;
    iat: number;
    [key: string]: any;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<AuthResult>;
    logout: () => void;
    authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

export interface AuthResult {
    success: boolean;
    error?: string;
}