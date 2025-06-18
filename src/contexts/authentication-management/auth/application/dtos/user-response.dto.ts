export class UserResponseDTO{
    readonly userId: bigint;
    readonly employeeId: bigint;
    readonly username: string;
    readonly email: string;
    readonly isActive: boolean;
    readonly lastLogin?: Date | null;
    readonly createdAt: Date;
    readonly updatedAt?: Date | null;
    readonly deletedAt?: Date | null;
    constructor(
        userId: bigint,
        employeeId: bigint,
        username: string,
        email: string,
        isActive: boolean,
        createdAt: Date,
        lastLogin?: Date | null,
        updatedAt?: Date | null,
        deletedAt?: Date | null,
    ){
        this.userId = userId;
        this.employeeId = employeeId;
        this.username = username;
        this.email = email;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        Object.freeze(this);
    }
}