import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/has-permission.decorator'; // Importa la clave de permisos

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener los permisos requeridos de los metadatos de la ruta
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true; // Si no hay permisos definidos, la ruta es accesible para cualquier autenticado.
    }

    // 2. Obtener el usuario autenticado del objeto de solicitud
    // req.user contendrá los permisos inyectados por JwtStrategy
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.permissions) {
      return false; // Si no hay usuario o permisos en el payload, no está autorizado.
    }

    // 3. Verificar si el usuario tiene TODOS los permisos requeridos
    // Un error común es usar `some` en lugar de `every` si se requiere que el usuario
    // tenga *todos* los permisos especificados para acceder.
    const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
      user.permissions.includes(permission)
    );

    return hasAllRequiredPermissions;
  }
}