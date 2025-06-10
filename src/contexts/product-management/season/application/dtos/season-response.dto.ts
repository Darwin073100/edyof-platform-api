export class SeasonResponseDto {
  seasonId: bigint;
  name: string;
  description?: string | null;
  dateInit: Date;
  dateFinish: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
