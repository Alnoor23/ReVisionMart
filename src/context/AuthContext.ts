import React, { useContext } from "react";
import { User, Wishlist } from "../api/types";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  userWishlist: Wishlist | null;
  setUserWishlist: (wishlist: Wishlist | null) => void;
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
