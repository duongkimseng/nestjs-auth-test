import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/models/dto/create-user.dto';
import { LoginUserDto } from 'src/user/models/dto/login-user.dto';
import { UserDto } from 'src/user/models/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginStatus } from './interfaces/login.status';
import { RegistrationStatus } from './interfaces/registation.status';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    private _createToken({username}: UserDto): any{
        const user: JwtPayload = {username};
        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken
        };
    }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus>{
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try{
            await this.userService.create(userDto);
        }catch(err){
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus>{
        const user = await this.userService.findByLogin(loginUserDto);

        const token = this._createToken(user);

        return {
            username: user.username, ...token,
        };
    }
    
    async validateUser(payload: JwtPayload): Promise<UserDto>{
        const user = await this.userService.findByPayload(payload);
        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}


