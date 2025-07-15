export const BRANCH_OFFICE_CHECKER_PORT = Symbol('BRANCH_OFFICE_CHECKER_PORT');
export interface BranchOfficeCheckerPort {
  exists(branchOfficeId: bigint): Promise<boolean>;
}