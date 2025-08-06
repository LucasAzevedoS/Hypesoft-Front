import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7150/api",
    withCredentials: true,
});

export default api;
