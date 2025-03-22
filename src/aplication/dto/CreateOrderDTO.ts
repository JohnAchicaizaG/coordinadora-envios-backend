/**
 * Data Transfer Object (DTO) para la creación de una orden de envío.
 *
 * @interface CreateOrderDTO
 * @property {number} weight - Peso del paquete (en kilogramos o unidad definida).
 * @property {string} dimensions - Dimensiones del paquete (ej. "30x20x15 cm").
 * @property {string} productType - Tipo de producto contenido en el paquete.
 * @property {string} destinationAddress - Dirección completa de destino del envío.
 */
export interface CreateOrderDTO {
    weight: number;
    dimensions: string;
    productType: string;
    destinationAddress: string;
}
