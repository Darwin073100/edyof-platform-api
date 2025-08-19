export const INVENTORY_CHECKER_PORT = 'INVENTORY_CHECKER_PORT';

export interface InventoryCheckerPort{
    exist(id: bigint):Promise<boolean>
}