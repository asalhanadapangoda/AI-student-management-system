export interface AuthUser {
  adminId: number;
  name: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  adminId: number;
  name: string;
  role: string;
}
