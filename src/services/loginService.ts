import api from "./api";
import { Product } from "../types/products";
import { LoginCredentials, LoginResponse } from "../types/login";

export const loginService = {
    // login: async (username: string, password: string): Promise<string> => {
    //     const { data } = await api.post<string>("/login", { username, password, payload: { username, password } });
    //     return data;
    // },


    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const { data } = await api.post<LoginResponse>("/auth/login", credentials);
        return data;
    },

    isAuthenticated: async (): Promise<boolean> => {
        try {
            await api.get("/IsAuthenticated");
            return true;
        } catch (error) {
            return false;
        }
    }
};