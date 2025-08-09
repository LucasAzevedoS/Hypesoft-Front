export interface LoginCredentials {
    username: string;
    password: string;
    access_token: string;
}

export interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
};

export interface LoginError {
    error: string;
    details?: string;
}