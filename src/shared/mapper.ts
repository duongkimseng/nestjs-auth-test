import { UserDto } from "src/user/models/dto/user.dto";
import { UserEntity } from "src/user/models/entities/user.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export const toUserDto = (data: UserEntity): UserDto => {
    const {id, username, name, email} = data;
    let userDto: UserDto = {id, username, name, email};
    return userDto;
}