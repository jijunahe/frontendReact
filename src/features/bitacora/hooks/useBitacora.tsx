import { useState, useEffect } from "react";
import { fetchBitacora } from "../api";
import { BitacoraEvent } from "../types";

export const useBitacora = () => {
  const [bitacora, setBitacora] = useState<BitacoraEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBitacora = async () => {
      try {
        setLoading(true);
        const data = await fetchBitacora();
        console.log("Bitácora cargada:", data);
        setBitacora(data);
      } catch (err) {
        setError("Error al cargar la bitácora");
      } finally {
        setLoading(false);
      }
    };
    loadBitacora();
  }, []);

  return { bitacora, loading, error };
};
