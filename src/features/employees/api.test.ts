import axios from "axios";
import { fetchEmployees } from "./api"; // Importa la función que queremos probar

jest.mock("axios"); //  Simulamos el módulo axios

describe("fetchEmployees", () => {
  it("debe devolver la lista de empleados correctamente", async () => {
    const empleadosMock = [
      { id: 1, nombres: "Juan", apellidos: "Pérez", email: "juan@example.com", cargo: "Desarrollador" },
      { id: 2, nombres: "María", apellidos: "Gómez", email: "maria@example.com", cargo: "Gerente" },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: empleadosMock });

    const empleados = await fetchEmployees(); // Llamamos a la función que hace la petición

    expect(empleados).toEqual(empleadosMock); // Verificamos que el resultado sea el esperado
    expect(axios.get).toHaveBeenCalledTimes(1); // Verificamos que se haya llamado una vez
    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/empleados`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }); // Verificamos que se usó la URL correcta
  });

  it("debe manejar errores de la API correctamente", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error("Error en la API"));

    await expect(fetchEmployees()).rejects.toThrow("Error en la API"); // Verificamos que lanza un error
  });
});
