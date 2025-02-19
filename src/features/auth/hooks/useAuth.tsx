import { createContext, useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_API_URL}`;

// Definimos el contexto sin `null` para evitar errores
export const AuthContext = createContext<AuthContextType>(undefined as any);

interface AuthContextType {
  token: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (name: string, email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
    } catch (error) {
      Swal.fire("Error", "Credenciales inválidas", "error");
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      Swal.fire("Éxito", "Usuario registrado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo registrar el usuario", "error");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    Swal.fire("Éxito", "Sesión cerrada correctamente", "success");
  };

  const contextValue: AuthContextType = {
    token,
    handleLogin,
    handleRegister,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

//Exporta `useAuth` correctamente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
