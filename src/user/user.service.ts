import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';
import { LoginUserDto } from './models/dto/login-user.dto';
import { UserDto } from './models/dto/user.dto';
import { UserEntity } from './models/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ){}

    async fineOne(options?: object): Promise<UserDto>{
        const user = await this.userRepo.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({username, password}: LoginUserDto): Promise<UserDto>{
        const user = await this.userRepo.findOne({where: {username}});
        if(!user){
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await bcrypt.compareSync(password, user.password);
        console.log(areEqual);
        if(!areEqual){
            throw new HttpException('Login invalid', HttpStatus.UNAUTHORIZED);
        }
        return toUserDto(user);
    }

    async findByPayload({username}: any): Promise<UserDto>{
        return await this.userRepo.findOne({where: {username}});
    }

    async create(userDto: CreateUserDto): Promise<UserDto>{
        const { username, password, email} = userDto;

        const userInDb = await this.userRepo.findOne({where: {username}});

        if(userInDb){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepo.create({username, password, email});

        await this.userRepo.save(user);
        return toUserDto(user);
    }
}
