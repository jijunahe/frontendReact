import axios from "axios";
import { login } from "./api"; // Asegúrate de importar la función correcta

jest.mock("axios"); // Simulamos axios

describe("Autenticación - login", () => {
  it("debe autenticar correctamente y recibir un token JWT", async () => {
    const mockToken = "fake-jwt-token";
    const userCredentials = { email: "test@test.com", password: "123456" };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: { token: mockToken },
    });

    const token = await login(userCredentials.email, userCredentials.password);
    console.log("EL TOKEN ",token.token);
    // Antes: expect(token).toEqual(mockToken);
    expect(token.token).toEqual(mockToken);  
    
    
    expect(axios.post).toHaveBeenCalledTimes(1); // Verificamos que se llamó la API una vez
    expect(axios.post).toHaveBeenCalledWith(`${process.env.VITE_API_URL}/login`, userCredentials); // Verificamos la URL
  });

  it("debe fallar con credenciales incorrectas", async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error("Credenciales inválidas"));

    await expect(login("fake@email.com", "wrongpassword")).rejects.toThrow("Credenciales inválidas");
  });
});
