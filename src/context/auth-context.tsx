import { createContext, useEffect, useState } from "react";
import { LS_TOKEN } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  userEmail: string | null;
  token: string | null;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(LS_TOKEN));
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decode: {
          email: string
        } = jwtDecode(token)

        setUserEmail(decode.email)
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem(LS_TOKEN);
    setToken(null);
    setUserEmail(null);
    navigate("/auth/sign-in");
  };

  return (
    <AuthContext.Provider value={{ userEmail, token, logout }}>
      {children}
    </AuthContext.Provider>
  )
};
