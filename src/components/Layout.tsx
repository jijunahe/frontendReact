import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      
      {/* Menú lateral fijo */}
      <Sidebar />
      
      {/* Contenedor principal con margen a la izquierda */}
      <Box component="main"  >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
