import { useEffect, useState } from "react";
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee, fetchPositions } from "../api";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCargo, setFilterCargo] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  useEffect(() => {
    loadEmployees();
    loadPositions();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
    setLoading(false);
  };

  const loadPositions = async () => {
    try {
      const data = await fetchPositions();
      setPositions(data);
    } catch (error) {
      console.error("Error al cargar posiciones:", error);
    }
  };

  const addEmployee = async (employeeData: any) => {
    try {
      await createEmployee(employeeData);
      loadEmployees();
    } catch (error) {
      console.error("Error al crear empleado:", error);
    }
  };

  const editEmployee = async (id: number, employeeData: any) => {
    try {
      await updateEmployee(id, employeeData);
      loadEmployees();
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
    }
  };

  const removeEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      (search === "" ||
        emp.nombres.toLowerCase().includes(search.toLowerCase()) ||
        emp.apellidos.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.documento_identidad.includes(search)) &&
      (filterCargo === "" || emp.cargo === filterCargo) &&
      (filterEstado === "" || emp.estado === filterEstado)
    );
  });

  return {
    employees: filteredEmployees,
    positions,
    loading,
    search,
    setSearch,
    filterCargo,
    setFilterCargo,
    filterEstado,
    setFilterEstado,
    addEmployee,
    editEmployee,
    removeEmployee,
  };
};
