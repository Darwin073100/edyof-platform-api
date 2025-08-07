import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterUserUseCase } from "../../../application/use-cases/register-user.use-case";
import { RegisterUserRequestDTO } from "../dtos/register-user.request.dto";
import { RegisterUserDTO } from "../../../application/dtos/register-user.dto";
import { UserMapper } from "../../../application/mapper/user.mapper";
import { UserResponseDTO } from "../../../application/dtos/user-response.dto";
import { InvalidUserException } from "../../../domain/exceptions/invalid-user.exception";
import { UserAlreadyExistsException } from "../../../domain/exceptions/user-already-exists.exception";
import { NotFoundRoleException } from "src/contexts/authentication-management/role/domain/exceptions/not-found-role.exception";
import { RegisterUserWithEmployeeUseCase } from "../../../application/use-cases/register-user-with-employee.use-case";
import { RegisterUserWithEmployeeRequestDTO } from "../dtos/register-user-with-employee.request.dto";
import { RegisterUserWithEmployeeDTO } from "../../../application/dtos/register-user-with-employee.dto";

@Controller('users')
export class UserController{
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly registerUserWithEmployeeUseCase: RegisterUserWithEmployeeUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() registerUser:RegisterUserRequestDTO):Promise<UserResponseDTO>{
        try{
            const userDto = new RegisterUserDTO(registerUser.employeeId, registerUser.roleId,registerUser.username, registerUser.email,registerUser.password);
            
            const user = await this.registerUserUseCase.excecute(userDto);
            
            return UserMapper.toResponseDTO(user);
        } catch(error){
            if(error instanceof InvalidUserException){
                throw new BadRequestException(error.message);
            }

            if(error instanceof UserAlreadyExistsException){
                throw new ConflictException(error.message); 
            }

            if(error instanceof NotFoundRoleException){
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
    @Post('with-employee')
    @HttpCode(HttpStatus.CREATED)
    async registerUserWithEmployee(@Body() registerUser:RegisterUserWithEmployeeRequestDTO):Promise<UserResponseDTO>{
        try{
            const userDto = new RegisterUserWithEmployeeDTO( 
                registerUser.branchOfficeId, 
                registerUser.username, 
                registerUser.email,
                registerUser.password,
                registerUser.firstName,
                registerUser.lastName,
                registerUser.phoneNumber,
            );
            
            const user = await this.registerUserWithEmployeeUseCase.excecute(userDto);
            
            return UserMapper.toResponseDTO(user);
        } catch(error){
            if(error instanceof InvalidUserException){
                throw new BadRequestException(error.message);
            }

            if(error instanceof UserAlreadyExistsException){
                throw new ConflictException(error.message); 
            }

            if(error instanceof NotFoundRoleException){
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}