import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Puedes sobrescribir este método para personalizar el manejo de errores
  // cuando la autenticación falla (ej. token expirado, token inválido).
  handleRequest(err: any, user: any, info: any) {
    // Si la estrategia JWT lanzó un error o no se pudo autenticar al usuario,
    // lanzamos una UnauthorizedException.
    if (err || !user) {
      // Info puede contener detalles sobre el error del JWT (ej. 'TokenExpiredError')
      if (info instanceof Error) {
        if (info.name === 'TokenExpiredError') {
          throw new UnauthorizedException('El token de autenticación ha expirado. Por favor, inicie sesión de nuevo.');
        }
        if (info.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Token de autenticación inválido o malformado.');
        }
        // Otros errores relacionados con JWT
        throw new UnauthorizedException(`Error de token: ${info.message}`);
      }

      // Si no hay información de error específica, o es un error genérico
      throw err || new UnauthorizedException('Acceso no autorizado. Se requiere autenticación.');
    }
    // Si la autenticación fue exitosa, 'user' contendrá el objeto que retornó
    // el método 'validate' de tu JwtStrategy. Lo retornamos para que esté disponible en 'req.user'.
    return user;
  }
}