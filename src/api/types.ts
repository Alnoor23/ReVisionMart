export interface RegisterResponseBody {
  _id: string;
  name: string;
  email: string;
  message?: string | null;
}

export interface LoginResponseBody {
  token: string;
  message?: string | null;
}
