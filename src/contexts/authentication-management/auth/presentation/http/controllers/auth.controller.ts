import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ValidateAuthUseCase } from "../../../application/use-cases/validate-auth.use-case";
import { loginAuthUseCase } from '../../../application/use-cases/login-auth.use-case';
import { HasPermission } from "src/shared/decorators/has-permission.decorator";
import { PermissionsGuard } from "src/shared/guards/permissions.guard";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly validateAuthUseCase: ValidateAuthUseCase,
        private readonly loginAuthUseCase: loginAuthUseCase
    ) { }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async login(@Request() req: any) {
        // req.user contiene el usuario autenticado
        return this.loginAuthUseCase.execute(req.user);
    }

    @Get('create') // Ruta de ejemplo que requiere permiso de creación
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermission('user:read_all') // Requiere el permiso de creación de establecimiento
    @HttpCode(HttpStatus.CREATED)
    createEstablishment(@Request() req) {
        return {
            message: `Establecimiento creado por ${req.user.username}. Requiere permiso 'establishment:create'.`,
            user: req.user
        };
    }
}