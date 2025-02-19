import axios from "axios";
import { handleApiError } from "../../utils/errorHandler";
import Swal from "sweetalert2";


const API_URL =`${import.meta.env.VITE_API_URL}`; // Backend Laravel
const POSITIONS_API_URL = `${import.meta.env.VITE_API_PUESTOTRABAJO}`; // API de cargos

export const fetchEmployees = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/empleados`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createEmployee = async (employeeData: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/empleados`, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      await Swal.fire({
        title: "Éxito",
        text: "Empleado creado correctamente",
        icon: "success",
        allowOutsideClick: false,  
        showConfirmButton: true,  
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  
  export const updateEmployee = async (id: number, employeeData: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/empleados/${id}`, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
       await Swal.fire({
        title: "Éxito",
        text: "Empleado actualizado correctamente",
        icon: "success",
        allowOutsideClick: false,  
        showConfirmButton: true,  
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

export const deleteEmployee = async (id: number) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/empleados/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

 
export const fetchPositions = async () => {
    try {
      const response = await fetch(POSITIONS_API_URL);
      const data = await response.json();
      return data.positions; // Retorna solo la lista de posiciones
    } catch (error) {
      console.error("Error al obtener posiciones:", error);
      return [];
    }
  };
  
