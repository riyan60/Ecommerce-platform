export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: "CUSTOMER" | "ADMIN";
    };
  };
}