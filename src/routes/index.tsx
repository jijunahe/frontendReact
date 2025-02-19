import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import EmployeesPage from "../features/employees/pages/EmployeesPage";
import CreateEmployeePage from "../features/employees/pages/CreateEmployeePage";
import BitacoraPage from "../features/bitacora/pages/BitacoraPage";

import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../features/common/pages/NotFoundPage";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rutas protegidas dentro del Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/create" element={<CreateEmployeePage />} />
          <Route path="/bitacora" element={<BitacoraPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
