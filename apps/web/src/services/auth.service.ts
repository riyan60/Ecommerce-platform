
import api from "./api";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../types/auth";

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const registerUser = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    userData
  );

  return response.data;
};
