export const ESTABLISHMENT_CHECKER_PORT = Symbol('ESTABLISHMENT_CHECKER_PORT');

export interface EstablishmentCheckerPort {
  /**
   * Verifica si un establecimiento con el ID dado existe.
   * @param establishmentId El ID del establecimiento a verificar.
   * @returns True si el establecimiento existe, false en caso contrario.
   */
  exists(establishmentId: bigint): Promise<boolean>;
}