import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterUserUseCase } from "../../../application/use-cases/register-user.use-case";
import { RegisterUserRequestDTO } from "../dtos/register-user.request.dto";
import { RegisterUserDTO } from "../../../application/dtos/register-user.dto";
import { UserMapper } from "../../../application/mapper/user.mapper";
import { UserResponseDTO } from "../../../application/dtos/user-response.dto";
import { InvalidUserException } from "../../../domain/exceptions/invalid-user.exception";
import { UserAlreadyExistsException } from "../../../domain/exceptions/user-already-exists.exception";

@Controller('users')
export class UserController{
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() registerUser:RegisterUserRequestDTO):Promise<UserResponseDTO>{
        try{
            const userDto = new RegisterUserDTO(registerUser.employeeId,registerUser.username, registerUser.email,registerUser.password);
            
            const user = await this.registerUserUseCase.excecute(userDto);
            
            return UserMapper.toResponseDTO(user);
        } catch(error){
            if(error instanceof InvalidUserException){
                throw new BadRequestException(error.message);
            }

            if(error instanceof UserAlreadyExistsException){
                throw new ConflictException(error.message); 
            }
            throw error;
        }
    }
}