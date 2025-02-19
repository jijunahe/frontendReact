import { createContext, useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_API_URL}`;

 interface AuthContextType {
  token: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (name: string, email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

 export const AuthContext = createContext<AuthContextType | null>(null);

 export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    //  Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
    } catch (error) {
      Swal.fire("Error", "Credenciales inválidas", "error");
    }
  };

  const handleRegister = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation // Enviamos la confirmación
      });
  
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
    setTimeout(function(){
      window.location.href = "/login";
    },1500);
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

 export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
