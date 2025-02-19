import { useState } from "react";
import { Employee } from "../types";
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Box 
} from "@mui/material";
import Swal from "sweetalert2";

interface EmployeeFormProps {
  onSave: (employee: Employee) => Promise<void>;
  positions: string[];
  employee?: Employee | null;
}

const initialState: Employee = {
  id: 0,
  nombres: "",
  apellidos: "",
  email: "",
  documento_identidad: "",
  cargo: "",
  fecha_nacimiento: "",
  fecha_ingreso: "",
  estado: "activo",
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSave, positions, employee = null }) => {
  const [formData, setFormData] = useState<Employee>(employee || initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSave(formData);
      Swal.close();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar el empleado", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
       
         <Box component="form">
          <TextField fullWidth label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Documento Identidad" name="documento_identidad" value={formData.documento_identidad} onChange={handleChange} required sx={{ mb: 2 }} />

           <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Cargo</InputLabel>
            <Select name="cargo" value={formData.cargo || ""} onChange={handleChange} required>
              <MenuItem value="">Seleccione un cargo</MenuItem>
              {positions.map((pos) => (
                <MenuItem key={pos} value={pos}>{pos}</MenuItem>
              ))}
            </Select>
          </FormControl>

           <Box display="flex" gap={2} sx={{ mb: 2 }}>
            <TextField fullWidth type="date" label="Fecha Nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
            <TextField fullWidth type="date" label="Fecha Ingreso" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} required />
          </Box>

           <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Estado</InputLabel>
            <Select name="estado" value={formData.estado || ""} onChange={handleChange} required>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="dado de baja">Dado de baja</MenuItem>
              <MenuItem value="de vacaciones">De vacaciones</MenuItem>
              <MenuItem value="permiso">Permiso</MenuItem>
              <MenuItem value="licencia">Licencia</MenuItem>
            </Select>
          </FormControl>

           <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={() => Swal.close()}>
              Cancelar
            </Button>
            <Button type="button" variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : employee ? "Actualizar" : "Crear"} Empleado
            </Button>
          </Box>
        </Box>
      
    </Container>
  );
};

export default EmployeeForm;
