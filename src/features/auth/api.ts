import axios from "axios";
import { handleApiError } from "../../utils/errorHandler";
//import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_API_URL}`;
/*
export const login = async (email: string, password: string) => {
    try{
        const response = await axios.post(`${API_URL}/login`, { email, password });
        let respuesta=response.data;
        return respuesta;
    }catch(error){
        handleApiError(error);
        throw error;
    }
};*/


export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    console.log(" Respuesta completa del login:", response.data); // Verifica la estructura de la respuesta

    return response.data.token; // Asegúrate de devolver solo el token
  } catch (error) {
    throw new Error("Credenciales inválidas");
  }
};


export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    password_confirmation: password,
  });
  return response.data;
};
export const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  
    localStorage.removeItem("token"); // Limpiar token del almacenamiento
  };
  export const refreshToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      await axios.post(
        `${API_URL}/refresh`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error al refrescar el token:", error);
    }
  
    localStorage.removeItem("token"); // Limpiar token del almacenamiento
  };
  