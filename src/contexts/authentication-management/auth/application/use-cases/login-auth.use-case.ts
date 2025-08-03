import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/contexts/authentication-management/auth/domain/entities/user.entity";

export class loginAuthUseCase{
    constructor(
    private readonly jwtService: JwtService,
  ) {}

    // Este método es para generar el JWT después de una validación exitosa
  async execute(user: UserEntity): Promise<{ accessToken: string }> {
    console.log('🔍 DEBUG LoginAuthUseCase - Usuario recibido:', {
      userId: user.userId,
      username: user.username?.value,
      userRolesCount: user.userRoles?.length || 0,
      userRoles: user.userRoles?.map(ur => ({
        roleName: ur.roleName,
        permissions: ur.permissions
      })) || []
    });

    const payload = {
      username: user.username?.value,
      email: user.email?.value,
      userId: user.userId,
      permissions: user.userRoles?.flatMap(role => role.permissions) || [],
      roles: user.userRoles?.map(role => role.roleName) || [],
    };

    console.log('🔍 DEBUG LoginAuthUseCase - Payload del JWT:', payload);

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}