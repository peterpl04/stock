import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { authService } from "../services/auth.service";
import { AuthResponse, User } from "../types/api";

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false
};

export const hydrateAuth = createAsyncThunk("auth/hydrate", async () => {
  const [token, userRaw] = await Promise.all([
    AsyncStorage.getItem("@lato/token"),
    AsyncStorage.getItem("@lato/user")
  ]);

  return {
    token,
    user: userRaw ? (JSON.parse(userRaw) as User) : null
  };
});

export const login = createAsyncThunk("auth/login", async (payload: { email: string; password: string }) => {
  try {
    const result = await authService.login(payload);
    await persistAuth(result);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as { message?: string } | undefined)?.message;
      throw new Error(message || "Falha ao autenticar");
    }
    throw error;
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string }) => {
    try {
      const result = await authService.register(payload);
      await persistAuth(result);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        throw new Error(message || "Falha ao cadastrar");
      }
      throw error;
    }
  }
);

async function persistAuth(result: AuthResponse) {
  await Promise.all([
    AsyncStorage.setItem("@lato/token", result.token),
    AsyncStorage.setItem("@lato/user", JSON.stringify(result.user))
  ]);
}

export const logout = createAsyncThunk("auth/logout", async () => {
  await Promise.all([AsyncStorage.removeItem("@lato/token"), AsyncStorage.removeItem("@lato/user")]);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  }
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
