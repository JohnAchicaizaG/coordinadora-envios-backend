import { CreateTransporterDTO } from "@/aplication/dto/CreateTransporterDTO";
import { db } from "@/config/db";
import { ITransporterRepository } from "@/domain/interfaces/ITransporterRepository";
import { Transporter } from "@/domain/entities/Transporter";

/**
 * Implementación del repositorio de transportadores que maneja las operaciones de base de datos
 * relacionadas con los transportadores.
 * @implements {ITransporterRepository}
 */
export class TransporterRepository implements ITransporterRepository {
    /**
     * Crea un nuevo transportador en la base de datos.
     * @param {CreateTransporterDTO} data - Los datos del transportador a crear
     * @param {string} data.name - Nombre del transportador
     * @param {number} data.capacity - Capacidad del transportador
     * @param {boolean} [data.available=true] - Estado de disponibilidad del transportador
     * @returns {Promise<void>} Una promesa que se resuelve cuando se completa la creación
     */
    async createTransporter(data: CreateTransporterDTO): Promise<void> {
        const { name, capacity, available = true } = data;

        await db.query(
            "INSERT INTO transporters (name, capacity, available) VALUES (?, ?, ?)",
            [name, capacity, available],
        );
    }

    /**
     * Obtiene todos los transportadores de la base de datos.
     * @returns {Transporter<Transporter[]>} Una promesa que se resuelve con un array de transportadores
     */
    async getAllTransporters(): Promise<Transporter[]> {
        const [rows] = await db.query(
            "SELECT * FROM transporters WHERE available = true ORDER BY created_at DESC",
        );
        return rows as Transporter[];
    }
}
