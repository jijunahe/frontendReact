import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Toolbar, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useAuth } from "../features/auth/context/AuthProvider";

const Sidebar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [openEmployees, setOpenEmployees] = useState(false);

  const logoutAndRedirect = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          color: "#333",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem>
          <ListItemIcon><FolderIcon style={{ color: "#666" }} /></ListItemIcon>
          <ListItemText primary="Menú" primaryTypographyProps={{ fontWeight: "bold" }} />
        </ListItem>

        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon style={{ color: "#333" }} /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        {/* Menú Empleados con Submenú */}
        <ListItem button onClick={() => setOpenEmployees(!openEmployees)}>
          <ListItemIcon><PeopleIcon style={{ color: "#333" }} /></ListItemIcon>
          <ListItemText primary="Empleados" />
          {openEmployees ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openEmployees} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/employees" sx={{ pl: 4 }}>
              <ListItemIcon><PeopleIcon style={{ color: "#666" }} /></ListItemIcon>
              <ListItemText primary="Lista de Empleados" />
            </ListItem>
            <ListItem button component={Link} to="/employees/create" sx={{ pl: 4 }}>
              <ListItemIcon><AddCircleOutlineIcon style={{ color: "#666" }} /></ListItemIcon>
              <ListItemText primary="Crear Nuevo Empleado" />
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />

        <ListItem button component={Link} to="/bitacora">
          <ListItemIcon><HistoryIcon style={{ color: "#333" }} /></ListItemIcon>
          <ListItemText primary="Bitácora" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem button onClick={logoutAndRedirect}>
          <ListItemIcon><ExitToAppIcon style={{ color: "#cc0000" }} /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
