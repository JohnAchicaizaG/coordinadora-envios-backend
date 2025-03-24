import { ITransporterRepository } from "../../domain/interfaces/ITransporterRepository";
import { CreateTransporterDTO } from "../dto/CreateTransporterDTO";

/**
 * Clase que maneja la lógica de negocio para crear un transportador
 */
export class CreateTransporter {
    /**
     * Crea una instancia de CreateTransporter
     * @param repo - Repositorio que maneja las operaciones de persistencia de transportadores
     */
    constructor(private readonly repo: ITransporterRepository) {}

    /**
     * Ejecuta la creación de un nuevo transportador
     * @param data - Datos necesarios para crear el transportador
     * @returns Promise<void> - Promesa que se resuelve cuando se completa la creación
     */
    async execute(data: CreateTransporterDTO): Promise<void> {
        await this.repo.createTransporter(data);
    }
}
