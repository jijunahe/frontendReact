import Swal from "sweetalert2";

export const handleApiError = (error: any) => {
  //console.error("Error en la API:", error);

  let message = "Ocurrió un error inesperado. Inténtalo de nuevo.";
 
  if (error.response) {
    // Si el backend envía un mensaje de error, lo mostramos
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (typeof error.response.data === "string") {
      message = error.response.data;
    }else if(error.response.data.error){
        message = error.response.data.error;
    }
  } else if (error.message) {
    message = error.message;
  }

  Swal.fire("Error", message, "error");
};
