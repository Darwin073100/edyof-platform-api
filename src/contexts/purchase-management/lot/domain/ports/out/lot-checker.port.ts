export const LOT_CHECKER_PORT = Symbol('LOT_CHECKER_PORT');
export interface LotCheckerPort{
    /**
     * Verifica si un lote existe en el sistema.
     * @param lotId - El ID del lote a verificar.
     * @returns Una promesa que resuelve a true si el lote existe, false en caso contrario.
     */
    exists(lotId: bigint): Promise<boolean>;
}