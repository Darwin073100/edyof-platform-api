import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/contexts/authentication-management/auth/domain/entities/user.entity";
import { UserRepository } from "src/contexts/authentication-management/auth/domain/repositories/user.repository";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository:UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "default_secret", // Replace with your secret management
        });
    }

    async validate(payload: any):Promise<UserEntity> {
        // El payload es el objeto decodificado del JWT
        const { userId } = payload;
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new UnauthorizedException('El token recibido no es valido.');
        }
        return user;
    }
}