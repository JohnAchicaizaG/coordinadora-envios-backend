import { assignRouteSchema } from "../src/aplication/validators/assignRouteSchema";

describe("assignRouteSchema", () => {
    it("✅ valida correctamente un objeto válido", () => {
        const input = {
            orderId: 1,
            routeId: 5,
            transporterId: 10,
        };

        const parsed = assignRouteSchema.parse(input);
        expect(parsed).toEqual(input);
    });

    it("❌ lanza error si un campo falta", () => {
        expect(() =>
            assignRouteSchema.parse({
                orderId: 1,
                transporterId: 10,
            }),
        ).toThrow("Required");
    });

    it("❌ lanza error si un campo no es positivo", () => {
        expect(() =>
            assignRouteSchema.parse({
                orderId: 0,
                routeId: 2,
                transporterId: 3,
            }),
        ).toThrow();
    });

    it("❌ lanza error si un campo no es entero", () => {
        expect(() =>
            assignRouteSchema.parse({
                orderId: 1.5,
                routeId: 2,
                transporterId: 3,
            }),
        ).toThrow();
    });

    it("❌ lanza error si los campos son strings en lugar de números", () => {
        expect(() =>
            assignRouteSchema.parse({
                orderId: "1",
                routeId: "2",
                transporterId: "3",
            }),
        ).toThrow();
    });
});
