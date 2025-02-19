import axios from "axios";
 

const API_URL = `${import.meta.env.VITE_API_URL}`; // URL del backend

export const fetchBitacora = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/bitacora`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la bitácora:", error);
    return [];
  }
};
 