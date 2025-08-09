import api from "./api";
import { Product } from "../types/products";
import { LoginCredentials, LoginResponse } from "../types/login";

export const loginService = {
    // login: async (username: string, password: string): Promise<string> => {
    //     const { data } = await api.post<string>("/login", { username, password, payload: { username, password } });
    //     return data;
    // },


    login: async (payload: LoginCredentials): Promise<LoginCredentials> => {
        const response = await api.post<LoginCredentials>("/Auth/login", payload);
        return response.data;
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