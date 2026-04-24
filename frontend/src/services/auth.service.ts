import { api } from "./api";
import { AuthResponse } from "../types/api";

export const authService = {
  async login(payload: { email: string; password: string }) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  async register(payload: { name: string; email: string; password: string }) {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  }
};
