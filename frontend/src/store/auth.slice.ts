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

function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined;
    return data?.message || data?.error || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
}

export const login = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: string }>(
  "auth/login",
  async (payload, thunkApi) => {
    try {
      const result = await authService.login(payload);
      await persistAuth(result);
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error, "Falha ao autenticar"));
    }
  }
);

export const register = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (payload, thunkApi) => {
    try {
      const result = await authService.register(payload);
      await persistAuth(result);
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error, "Falha ao cadastrar"));
    }
  });

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
