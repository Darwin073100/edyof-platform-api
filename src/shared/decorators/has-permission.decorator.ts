// src/shared/decorators/has-permission.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'PERMISSION_KEY'; // Clave para el metadata

// El decorador ahora espera una lista de strings de permisos
export const HasPermission = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);