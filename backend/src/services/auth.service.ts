import bcrypt from "bcryptjs";
import { authRepository } from "../repositories/auth.repository";
import { signToken } from "../utils/jwt";

export const authService = {
  async register(payload: { name: string; email: string; password: string }) {
    const existing = await authRepository.findByEmail(payload.email);
    if (existing) {
      throw new Error("Email ja cadastrado");
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await authRepository.create({
      name: payload.name,
      email: payload.email,
      passwordHash
    });

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  },

  async login(payload: { email: string; password: string }) {
    const user = await authRepository.findByEmail(payload.email);
    if (!user) {
      throw new Error("Credenciais invalidas");
    }

    const ok = await bcrypt.compare(payload.password, user.passwordHash);
    if (!ok) {
      throw new Error("Credenciais invalidas");
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
};
