import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const auth = useAuth();
  if (!auth) return <p>Cargando...</p>;

  const { handleLogin } = auth;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin(email, password);
      navigate("/employees");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Correo o contraseña incorrectos.",
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
        {/* Icono */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Título */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Recordar Sesión */}
          <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />

          {/* Botón Login */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>

          {/* Links */}
          <Typography variant="body2" align="center">
            <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>
              Forgot password?
            </a>{" "}
            |{" "}
            <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign Up
            </a>
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
        {"Copyright © "}
        Pruebas  {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default LoginPage;
