import React, { useContext } from "react";
import { Wishlist } from "../api/types";

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  wishlist?: Wishlist;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
