import { registerUserSchema } from "../src/aplication/validators/registerUserSchema";
import { Role } from "../src/domain/enums/Role";
describe("registerUserSchema", () => {
    it("✅ valida un objeto con email, contraseña y rol por defecto", () => {
        const input = {
            email: "usuario@ejemplo.com",
            password: "secreta123",
        };

        const parsed = registerUserSchema.parse(input);

        expect(parsed).toEqual({
            ...input,
            role: Role.User, // Asumiendo que el rol por defecto es "user"
        });
    });

    it("✅ valida un objeto con email, contraseña y rol específico", () => {
        const input = {
            email: "admin@ejemplo.com",
            password: "admin123",
            role: Role.Admin,
        };

        const parsed = registerUserSchema.parse(input);

        expect(parsed).toEqual(input);
    });

    it("❌ lanza error si el email no es válido", () => {
        expect(() =>
            registerUserSchema.parse({
                email: "correo-no-valido",
                password: "secreta123",
            }),
        ).toThrow(/email/);
    });

    it("❌ lanza error si la contraseña tiene menos de 6 caracteres", () => {
        expect(() =>
            registerUserSchema.parse({
                email: "usuario@ejemplo.com",
                password: "123",
            }),
        ).toThrow(/password/);
    });

    it("❌ lanza error si falta el campo email", () => {
        expect(() =>
            registerUserSchema.parse({
                password: "secreta123",
            }),
        ).toThrow(/email/);
    });

    it("❌ lanza error si falta el campo password", () => {
        expect(() =>
            registerUserSchema.parse({
                email: "usuario@ejemplo.com",
            }),
        ).toThrow(/password/);
    });

    it("❌ lanza error si el rol no es un valor válido (ni 'user' ni 'admin')", () => {
        expect(() =>
            registerUserSchema.parse({
                email: "usuario@ejemplo.com",
                password: "secreta123",
                role: "invalidRole", // Valor de rol no permitido
            }),
        ).toThrow();
    });
});
