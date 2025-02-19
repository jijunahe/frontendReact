import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Asegura que está leyendo el token correctamente

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
