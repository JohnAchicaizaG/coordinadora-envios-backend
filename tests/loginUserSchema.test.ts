import { loginUserSchema } from "../src/aplication/validators/loginUserSchema";

describe("loginUserSchema", () => {
    it("✅ valida un objeto con email y contraseña correctos", () => {
        const input = {
            email: "usuario@ejemplo.com",
            password: "secreta123",
        };

        const parsed = loginUserSchema.parse(input);

        expect(parsed).toEqual(input);
    });

    it("❌ lanza error si el email no es válido", () => {
        expect(() =>
            loginUserSchema.parse({
                email: "correo-no-valido",
                password: "secreta123",
            }),
        ).toThrow(/email/);
    });

    it("❌ lanza error si la contraseña tiene menos de 6 caracteres", () => {
        expect(() =>
            loginUserSchema.parse({
                email: "usuario@ejemplo.com",
                password: "123",
            }),
        ).toThrow(/password/);
    });

    it("❌ lanza error si falta el campo email", () => {
        expect(() =>
            loginUserSchema.parse({
                password: "secreta123",
            }),
        ).toThrow(/email/);
    });

    it("❌ lanza error si falta el campo password", () => {
        expect(() =>
            loginUserSchema.parse({
                email: "usuario@ejemplo.com",
            }),
        ).toThrow(/password/);
    });
});
