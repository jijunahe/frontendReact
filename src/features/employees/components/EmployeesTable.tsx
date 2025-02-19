import { Employee } from "../types";
import { deleteEmployee } from "../api";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EmployeesTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: () => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, onEdit, onDelete }) => {
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteEmployee(id);
        Swal.fire("Eliminado", "El empleado ha sido eliminado.", "success");
        onDelete(); // Recargar la lista
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el empleado.", "error");
      }
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto", mt: 2, borderRadius: 2 }}>
      <Table sx={{ minWidth: 900, borderCollapse: "collapse" }} aria-label="tabla de empleados">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>Nombre</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>Email</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>Cargo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>Estado</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd", textAlign: "center" }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id} sx={{ borderBottom: "1px solid #ddd", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <TableCell sx={{ border: "1px solid #ddd" }}>{employee.nombres} {employee.apellidos}</TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>{employee.email}</TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>{employee.cargo}</TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>{employee.estado}</TableCell>
                <TableCell sx={{ border: "1px solid #ddd", textAlign: "center" }}>
                  <IconButton color="primary" onClick={() => onEdit(employee)} title="Editar">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(employee.id)} title="Eliminar">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center", py: 3 }}>
                No se encontraron empleados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
