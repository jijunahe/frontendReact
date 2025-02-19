import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { createEmployee, fetchPositions } from "../api";
import { handleApiError } from "../../../utils/errorHandler";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateEmployeePage = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<string[]>([]);
  const [employeeData, setEmployeeData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    cargo: "",
    documento_identidad: "",
    fecha_nacimiento: dayjs().format("YYYY-MM-DD"),  
    fecha_ingreso: dayjs().format("YYYY-MM-DD"),  
    estado: "activo",
  });

  // Cargar los cargos desde la API
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchPositions();
        setPositions(data);
      } catch (error) {
        handleApiError(error);
      }
    };
    loadPositions();
  }, []);

  // Manejo de cambios en los inputs de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setEmployeeData({ ...employeeData, [e.target.name!]: e.target.value });
  };

  // Manejo de cambios en los DatePickers
  const handleDateChange = (name: string, value: dayjs.Dayjs | null) => {
    if (value) {
      setEmployeeData({ ...employeeData, [name]: value.format("YYYY-MM-DD") }); // Asegurar formato
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEmployee(employeeData);
      Swal.fire("Éxito", "Empleado creado correctamente", "success");
      navigate("/employees");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear Nuevo Empleado
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombres"
            name="nombres"
            value={employeeData.nombres}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="apellidos"
            value={employeeData.apellidos}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          {/* Selector de Cargos */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Cargo</InputLabel>
            <Select name="cargo" value={employeeData.cargo} onChange={handleChange} required>
              {positions.map((position, index) => (
                <MenuItem key={index} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Documento Identidad"
            name="documento_identidad"
            value={employeeData.documento_identidad}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          {/* Campos de fecha en dos columnas */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Nacimiento"
                  value={dayjs(employeeData.fecha_nacimiento)}
                  onChange={(newValue) => handleDateChange("fecha_nacimiento", newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} required />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Ingreso"
                  value={dayjs(employeeData.fecha_ingreso)}
                  onChange={(newValue) => handleDateChange("fecha_ingreso", newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} required />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="secondary" onClick={() => navigate("/employees")}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEmployeePage;
