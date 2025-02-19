import axios from "axios";
import { fetchEmployees } from "./api"; 
jest.mock("axios"); 

describe("fetchEmployees", () => {
  it("debe devolver la lista de empleados correctamente", async () => {
    const empleadosMock = [
      { id: 1, nombres: "Juan", apellidos: "Pérez", email: "juan@example.com", cargo: "Desarrollador" },
      { id: 2, nombres: "María", apellidos: "Gómez", email: "maria@example.com", cargo: "Gerente" },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: empleadosMock });

    const empleados = await fetchEmployees(); // Metodo para hacer la busqueda

    expect(empleados).toEqual(empleadosMock); // Verificamos de resultado 
    expect(axios.get).toHaveBeenCalledTimes(1); // Verificamos que se haya llamado una vez
    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/empleados`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });  
  });

  it("debe manejar errores de la API correctamente", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error("Error en la API"));

    await expect(fetchEmployees()).rejects.toThrow("Error en la API");  
  });
});
