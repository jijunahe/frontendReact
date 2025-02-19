export interface BitacoraEvent {
  id: number;
  usuario: {
    id: number;
    name: string;
    email: string;
  } | null; // Puede ser "null" si no hay usuario registrado.
  accion: string;
  tabla_afectada: string;
  detalles:  string  ;
  fecha_evento: string;
}
