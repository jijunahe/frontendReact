import axios from "axios";
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from "./api";
import { login } from "../auth/api";

jest.mock("axios");

describe("API de empleados con autenticación", () => {
  let authToken="";

  const mockEmployee = {
    id: 1,
    nombres: "Juan",
    apellidos: "Pérez",
    email: "juanperez@test.com",
    cargo: "Desarrollador",
    documento_identidad: "123456789",
    fecha_nacimiento: "1990-05-15",
    fecha_ingreso: "2022-06-01",
    estado: "activo",
  };

  beforeAll(async () => {
    console.log("Iniciando test y obteniendo token...");
    
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "fake-jwt-token" },
    });
  
    authToken = await login("test@test.com", "123456"); // Usuario de prueba
     
    console.log(" Token obtenido en beforeAll:", authToken); // Ver si el token es correcto
  });
  

  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    console.log(" authToken después de cada test:", authToken);
  });
  test("fetchEmployees() debe obtener la lista de empleados", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [mockEmployee],
    });
    console.log("TOKEN DESDE API fetchEmployees",authToken);
    const employees = await fetchEmployees();
    expect(employees).toEqual([mockEmployee]);
    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/empleados`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  });

  test("createEmployee() debe crear un nuevo empleado", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: mockEmployee,
    });
    console.log("TOKEN DESDE API createEmployee",authToken);
    const newEmployee = await createEmployee(mockEmployee);
    expect(newEmployee).toEqual(mockEmployee);
    expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/empleados`, mockEmployee, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  });

  test("updateEmployee() debe actualizar un empleado", async () => {
    const updatedEmployee = { ...mockEmployee, cargo: "Líder Técnico" };

    (axios.put as jest.Mock).mockResolvedValueOnce({
      data: updatedEmployee,
    });
    console.log("TOKEN DESDE API updateEmployee",authToken);
    const result = await updateEmployee(mockEmployee.id, updatedEmployee);
    expect(result).toEqual(updatedEmployee);
    expect(axios.put).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/empleados/${mockEmployee.id}`,
      updatedEmployee,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  });

  test("deleteEmployee() debe eliminar un empleado por ID", async () => {
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce({});
    console.log("TOKEN DESDE API deleteEmployee",authToken);
    await deleteEmployee(mockEmployee.id);
    expect(axios.delete).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/empleados/${mockEmployee.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  });
});
