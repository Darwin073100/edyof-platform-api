export class RegisterUserDTO{
    readonly employeeId: bigint;
    readonly username: string;
    readonly email: string;
    readonly passwordPlain: string;
    constructor(
        employeeId: bigint,
        username: string,
        email: string,
        passwordHash: string,
    ){
        this.employeeId = employeeId;
        this.username = username;
        this.email = email;
        this.passwordPlain = passwordHash;
        Object.freeze(this);
    }
}