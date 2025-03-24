import { logger } from "@/config/logger";
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
const GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";

/**
 * Valida si una dirección es reconocida y localizada por Google Maps mediante la API de Geocoding.
 *
 * @async
 * @function isValidAddress
 * @param {string} address - Dirección a validar.
 * @returns {Promise<boolean>} `true` si la dirección es válida (encontrada), `false` en caso contrario o error.
 *
 * @example
 * const esValida = await isValidAddress("Calle 10 #20-30, Bogotá");
 * if (esValida) { // continuar... }
 */
export async function isValidAddress(address: string): Promise<boolean> {
    try {
        const response = await axios.get(GEOCODING_URL, {
            params: {
                address,
                key: GOOGLE_API_KEY,
            },
        });
        logger.info("Google Maps response:", response.data);
        const { status, results } = response.data;

        return status === "OK" && results.length > 0;
    } catch (err) {
        logger.info("Error al validar dirección con Google:", err);
        return false;
    }
}
