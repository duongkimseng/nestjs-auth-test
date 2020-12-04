import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/models/dto/create-user.dto';
import { LoginUserDto } from 'src/user/models/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login.status';
import { RegistrationStatus } from './interfaces/registation.status';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus>{
        const result: RegistrationStatus = await this.authService.register(createUserDto);
        if(!result.success){
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus>{
        return await this.authService.login(loginUserDto);
    }
}
