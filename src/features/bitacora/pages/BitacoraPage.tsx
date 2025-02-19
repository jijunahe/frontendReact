import { useEffect, useState } from "react";
import BitacoraTable from "../components/BitacoraTable";
import { fetchBitacora } from "../api";
import { BitacoraEvent } from "../types";
import { Box, TextField, Typography, Pagination, Paper } from "@mui/material";

const ITEMS_PER_PAGE = 6;

const BitacoraPage: React.FC = () => {
  const [bitacora, setBitacora] = useState<BitacoraEvent[]>([]);
  const [filteredBitacora, setFilteredBitacora] = useState<BitacoraEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const loadBitacora = async () => {
    const data = await fetchBitacora();
    setBitacora(data);
    setFilteredBitacora(data);
  };

  useEffect(() => {
    loadBitacora();
  }, []);

  // Filtrar bitácora según el término de búsqueda
  useEffect(() => {
    const filteredData = bitacora.filter((evento) => {
      const userName = evento.usuario?.name?.toLowerCase() || "";
      const userEmail = evento.usuario?.email?.toLowerCase() || "";
      return (
        userName.includes(searchTerm.toLowerCase()) ||
        userEmail.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredBitacora(filteredData);
    setCurrentPage(1); // Reiniciar a la primera página cuando se filtra
  }, [searchTerm, bitacora]);

  // Obtener registros de la página actual
  const totalPages = Math.ceil(filteredBitacora.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredBitacora.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
         Bitácora del Sistema
      </Typography>

      {/* Buscador */}
      <TextField
        label="Buscar por nombre o email..."
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Paper elevation={3} sx={{ p: 2 }}>
        <BitacoraTable bitacora={paginatedData} />
      </Paper>

      {/* Paginación */}
      {filteredBitacora.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default BitacoraPage;
