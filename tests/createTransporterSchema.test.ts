import { createTransporterSchema } from "../src/aplication/validators/createTransporterSchema";

describe("createTransporterSchema", () => {
    it("✅ valida un transportador con todos los campos válidos", () => {
        const input = {
            name: "Juan Pérez",
            capacity: 50,
            available: true,
        };
        const parsed = createTransporterSchema.parse(input);
        expect(parsed).toEqual(input);
    });

    it("✅ valida un transportador sin el campo 'available'", () => {
        const input = {
            name: "Transportadora Sur",
            capacity: 30,
        };
        const parsed = createTransporterSchema.parse(input);
        expect(parsed).toEqual(input);
    });

    it("❌ lanza error si el nombre tiene menos de 3 caracteres", () => {
        expect(() =>
            createTransporterSchema.parse({
                name: "Jo",
                capacity: 10,
            }),
        ).toThrow("El nombre del transportador es obligatorio");
    });

    it("❌ lanza error si la capacidad es 0 o menor", () => {
        expect(() =>
            createTransporterSchema.parse({
                name: "Juan",
                capacity: 0,
            }),
        ).toThrow("La capacidad debe ser mayor a 0");
    });

    it("❌ lanza error si 'available' no es booleano", () => {
        expect(() =>
            createTransporterSchema.parse({
                name: "Juan",
                capacity: 10,
                available: "sí",
            }),
        ).toThrow();
    });
});
