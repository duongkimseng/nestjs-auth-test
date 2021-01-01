import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { JwtService} from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository,
        private jwtService: JwtService
    ){}

    signUp(userDto: UserDto): Promise<void>{
        return this.userRepo.signUp(userDto);
    }

    async signIn(userDto: UserDto): Promise< {accessToken: string} >{
        const username = await this.userRepo.validateUserPassword(userDto);
        if(!username){
            throw new UnauthorizedException('invalid credantial');
        }

        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
