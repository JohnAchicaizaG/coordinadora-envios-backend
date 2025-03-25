import { createRouteSchema } from "../src/aplication/validators/createRouteSchema";

describe("createRouteSchema", () => {
    it("✅ valida correctamente un nombre de ruta válido", () => {
        const input = { name: "Ruta Norte" };
        const parsed = createRouteSchema.parse(input);
        expect(parsed).toEqual(input);
    });

    it("❌ lanza error si no se proporciona el nombre", () => {
        expect(() => createRouteSchema.parse({})).toThrow(
            "El nombre de la ruta es obligatorio",
        );
    });

    it("❌ lanza error si el nombre tiene menos de 3 caracteres", () => {
        expect(() => createRouteSchema.parse({ name: "AB" })).toThrow(
            "El nombre debe tener al menos 3 caracteres",
        );
    });

    it("❌ lanza error si el nombre no es una cadena", () => {
        expect(() => createRouteSchema.parse({ name: 123 })).toThrow();
    });
});
