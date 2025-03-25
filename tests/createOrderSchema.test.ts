import { createOrderSchema } from "../src/aplication/validators/createOrderSchema";

describe("createOrderSchema", () => {
    it("✅ valida correctamente una orden válida", () => {
        const input = {
            originAddress: "Calle 123 #45-67",
            weight: 5,
            dimensions: "30x20x10",
            productType: "Ropa",
            destinationAddress: "Cra 45 #67-89",
        };

        const parsed = createOrderSchema.parse(input);
        expect(parsed).toEqual(input);
    });

    it("❌ lanza error si el peso es negativo o cero", () => {
        expect(() =>
            createOrderSchema.parse({
                originAddress: "Calle 123",
                weight: 0,
                dimensions: "30x20x10",
                productType: "Ropa",
                destinationAddress: "Cra 45 #67-89",
            }),
        ).toThrow();
    });

    it("❌ lanza error si faltan campos requeridos", () => {
        expect(() =>
            createOrderSchema.parse({
                weight: 2,
                dimensions: "30x20x10",
                productType: "Zapatos",
                // Falta destinationAddress y originAddress
            }),
        ).toThrow();
    });

    it("❌ lanza error si las cadenas son demasiado cortas", () => {
        expect(() =>
            createOrderSchema.parse({
                originAddress: "abc", // < 5 caracteres
                weight: 2,
                dimensions: "12",
                productType: "TV",
                destinationAddress: "xyz", // < 5 caracteres
            }),
        ).toThrow();
    });

    it("❌ lanza error si weight no es un número", () => {
        expect(() =>
            createOrderSchema.parse({
                originAddress: "Calle 123",
                weight: "10",
                dimensions: "30x20x10",
                productType: "Electrodomésticos",
                destinationAddress: "Calle 45",
            }),
        ).toThrow();
    });
});
