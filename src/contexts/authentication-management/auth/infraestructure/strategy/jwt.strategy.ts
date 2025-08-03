import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository, USER_REPOSITORY } from "src/contexts/authentication-management/auth/domain/repositories/user.repository";
// Define la interfaz del payload que esperas en el JWT
// IMPORTANTE: Asegúrate de que esto refleje lo que pones en AuthService.login
export interface JwtPayload {
  userId: bigint;
  username: string;
  email: string;
  permissions: string[]; // Nombres de los permisos (ej. 'product:read')
  roles: string[];     // Nombres de los roles (ej. 'admin')
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "default_secret", // Replace with your secret management
        });
    }

    async validate(payload: JwtPayload):Promise<any> {
        // El payload es el objeto decodificado del JWT
        const { userId } = payload;
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new UnauthorizedException('El token recibido no es valido.');
        }

        // Extraer roles y permisos del usuario cargado desde la BD
        const roles = user.userRoles?.map(userRole => userRole.roleName) || [];
        const permissions = user.userRoles?.flatMap(userRole => userRole.permissions) || [];

        console.log('🔍 DEBUG JWT Strategy - Usuario cargado:', {
            userId: user.userId,
            username: user.username?.value,
            userRolesCount: user.userRoles?.length || 0,
            roles: roles,
            permissions: permissions,
            userRolesDetail: user.userRoles?.map(ur => ({
                roleName: ur.roleName,
                rolePermissions: ur._role?.permissions,
                permissions: ur.permissions
            }))
        });

        return {
            userId: user.userId,
            username: user.username?.value,
            email: user.email?.value,
            permissions: permissions, // Usar los permisos del usuario de la BD
            roles: roles,            // Usar los roles del usuario de la BD
        };
    }
}