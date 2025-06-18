import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/contexts/authentication-management/auth/domain/entities/user.entity";

export class loginAuthUseCase{
    constructor(
    private readonly jwtService: JwtService,
  ) {}

    // Este método es para generar el JWT después de una validación exitosa
  async execute(user: UserEntity): Promise<{ accessToken: string }> {
    // El payload del JWT debe contener información mínima pero suficiente
    // para identificar al usuario y cualquier rol/permiso necesario para la autorización.
    // Un error común es incluir información sensible o excesiva en el payload.
    const payload = { username: user.username, email: user.email, userId: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}