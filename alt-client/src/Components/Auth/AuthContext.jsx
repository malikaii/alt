import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authEndpoint = import.meta.env.VITE_AUTH_API_URL;

  const navigate = useNavigate();



    const register = async (username, email, password) => {
      setIsLoading(true);
      setError(null);

      try {
        if (username === "" || password === "" || email === "")
          throw new Error("Enter all fields");

        const res = await fetch(`${authEndpoint}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          const errorMessage = errorResponse.message;
          throw new Error(errorMessage);
        }

        const data = await res.json();

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };




  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      if (username === "" || password === "")
        throw new Error("Enter all fields");

      const res = await fetch(`${authEndpoint}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        const errorMessage = errorResponse.message;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      setAccessToken(data.accessToken);

      const userData = jwtDecode(data.accessToken);

      console.log(userData);
      

      setUser(userData);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fetch(`${authEndpoint}/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      setUser(null);
      setAccessToken(null);
    } catch (error) {
      setError(error.message);
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, accessToken, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
