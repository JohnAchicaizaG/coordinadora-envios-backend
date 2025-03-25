import { advancedOrderFilterSchema } from "../src/aplication/validators/advancedOrderFilterSchema";

describe("advancedOrderFilterSchema", () => {
    it("✅ valida un objeto con todos los campos opcionales correctamente", () => {
        const input = {
            status: "in_transit",
            startDate: "2025-03-24",
            endDate: "2025-03-28",
            transporterId: "12",
            routeId: "7",
        };

        const parsed = advancedOrderFilterSchema.parse(input);

        expect(parsed).toEqual({
            status: "in_transit",
            startDate: "2025-03-24",
            endDate: "2025-03-28",
            transporterId: 12,
            routeId: 7,
        });
    });

    it("✅ permite objeto vacío porque todos los campos son opcionales", () => {
        const input = {};
        const parsed = advancedOrderFilterSchema.parse(input);
        expect(parsed).toEqual({});
    });

    it("❌ lanza error si transporterId es un string no numérico", () => {
        expect(() =>
            advancedOrderFilterSchema.parse({
                transporterId: "abc",
            }),
        ).toThrow();
    });

    it("❌ lanza error si routeId es un array en vez de número", () => {
        expect(() =>
            advancedOrderFilterSchema.parse({
                routeId: [1, 2, 3],
            }),
        ).toThrow();
    });
});
