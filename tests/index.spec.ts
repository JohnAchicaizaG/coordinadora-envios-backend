import { suma } from "../src/index"; // Importamos la función desde el código fuente

describe("Pruebas para la función suma", () => {
  test("Debe sumar 2 números correctamente", () => {
    expect(suma(2, 3)).toBe(5);
  });

  test("Debe sumar números negativos correctamente", () => {
    expect(suma(-2, -3)).toBe(-5);
  });

  test("Debe sumar 0 correctamente", () => {
    expect(suma(5, 0)).toBe(5);
  });
});
