import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ValidateAuthUseCase } from "../../../application/use-cases/validate-auth.use-case";
import { loginAuthUseCase } from '../../../application/use-cases/login-auth.use-case';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginAuthUseCase: ValidateAuthUseCase,
        private readonly jwtLoginUseCase: loginAuthUseCase
    ){}
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async login(@Request() req: any){
        // req.user contiene el usuario autenticado
        return this.jwtLoginUseCase.execute(req.user);
    }
}