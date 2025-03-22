// src/shared/utils/hash.ts
import bcrypt from "bcryptjs";

/**
 * Hashea una contraseña en texto plano usando bcrypt.
 *
 * @function hashPassword
 * @param {string} plain - Contraseña en texto plano.
 * @returns {Promise<string>} Contraseña encriptada (hash).
 *
 * @example
 * const hashed = await hashPassword("mi-contraseña-segura");
 */
export const hashPassword = async (plain: string): Promise<string> => {
    return await bcrypt.hash(plain, 10);
};

/**
 * Compara una contraseña en texto plano con su versión hasheada.
 *
 * @function comparePassword
 * @param {string} plain - Contraseña en texto plano.
 * @param {string} hashed - Contraseña previamente encriptada.
 * @returns {Promise<boolean>} `true` si coinciden, `false` si no.
 *
 * @example
 * const isMatch = await comparePassword("secreta", user.password);
 */
export const comparePassword = async (
    plain: string,
    hashed: string,
): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
};
