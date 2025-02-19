import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeForm from "../components/EmployeeForm";
import { fetchEmployees, fetchPositions, createEmployee, updateEmployee } from "../api";
import { Employee } from "../types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createRoot } from "react-dom/client";
import { handleApiError } from "../../../utils/errorHandler";
import { Box, Button, Typography, Paper, TextField, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MySwal = withReactContent(Swal);
const ITEMS_PER_PAGE = 6; //Paginación

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [positions, setPositions] = useState<string[]>([]);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    const data = await fetchEmployees();
    setEmployees(data);
    setFilteredEmployees(data);
    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
  };

  const loadPositions = async () => {
    const data = await fetchPositions();
    setPositions(data);
  };

  useEffect(() => {
    loadEmployees();
    loadPositions();
  }, []);

  const handleSaveEmployee = async (employee: Employee) => {
    try {
      if (employee.id) {
        await updateEmployee(employee.id, employee);
      } else {
        await createEmployee(employee);
      }
      await loadEmployees();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    const formContainer = document.createElement("div");
    let root: any;

    MySwal.fire({
      title: "Editar Empleado",
      html: formContainer,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: { popup: "swal-wide" },
      didOpen: () => {
        root = createRoot(formContainer);
        root.render(<EmployeeForm onSave={handleSaveEmployee} positions={positions} employee={employee} />);
      },
      willClose: () => {
        if (root) {
          root.unmount();
        }
      },
    });
  };

  // Filtrado de empleados ! ! !
  useEffect(() => {
    const filteredData = employees.filter(
      (emp) =>
        emp.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredEmployees(filteredData);
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Volver a la página 1 
  }, [searchTerm, employees]);

  // Obtener los empleados de la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Lista de Empleados
      </Typography>

       <TextField
        label="Buscar empleado..."
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate("/employees/create")}
        sx={{ mb: 2 }}
      >
        Crear Empleado
      </Button>

      <Paper elevation={3} sx={{ p: 2 }}>
        <EmployeesTable employees={paginatedEmployees} onEdit={handleEditEmployee} onDelete={loadEmployees} />
      </Paper>
 
      {filteredEmployees.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default EmployeesPage;
