import { BitacoraEvent } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";

interface BitacoraTableProps {
  bitacora: BitacoraEvent[];
}

const BitacoraTable: React.FC<BitacoraTableProps> = ({ bitacora }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900, borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>
              Usuario
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>
              Acción
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>
              Tabla Afectada
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                border: "1px solid #ddd",
                width: "250px", // Mantener un ancho fijo
                maxWidth: "250px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Detalles
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", border: "1px solid #ddd" }}>
              Fecha
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bitacora.length > 0 ? (
            bitacora.map((evento) => (
              <TableRow key={evento.id} sx={{ borderBottom: "1px solid #ddd" }}>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {evento.usuario ? `${evento.usuario.name} (${evento.usuario.email})` : "Desconocido"}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>{evento.accion}</TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>{evento.tabla_afectada}</TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    width: "250px",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title={evento.detalles} arrow>
                    <span>{evento.detalles}</span>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {new Date(evento.fecha_evento).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center", py: 3 }}>
                No se encontraron registros en la bitácora.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BitacoraTable;
