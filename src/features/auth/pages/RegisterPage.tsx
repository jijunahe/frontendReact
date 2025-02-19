import { useState } from "react";
import { useAuth } from "../context/AuthProvider";  
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RegisterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  
  if (!auth) return <p>Cargando...</p>;
  const { handleRegister } = auth;  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);
    try {
      await handleRegister(name, email, password, passwordConfirmation);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada correctamente.",
        confirmButtonColor: "#3085d6",
      });
      navigate("/login"); // Redirige al login después del registro
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "No se pudo completar el registro. Verifica los datos ingresados.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component={Paper}
        elevation={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 3,
        }}
      >
         
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

         
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>

        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            margin="normal"
            fullWidth
            label="Nombre Completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />

         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>

           
          <Typography variant="body2" align="center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Inicia sesión aquí
            </a>
          </Typography>
        </Box>
      </Box>

      
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
        {"Copyright © "}
        Pruebas {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default RegisterPage;
