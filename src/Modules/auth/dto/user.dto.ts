import {IsLowercase, IsString, MaxLength, MinLength} from 'class-validator'

export class UserDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(24)
    password: string;
}