import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { GetUser } from './get-user.decorator';
import { UserEntity } from './user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('signup')
    signUp(@Body(ValidationPipe) userDto: UserDto): Promise<void>{
        return this.authService.signUp(userDto);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) userDto: UserDto): Promise<{accessToken: string}>{
        return this.authService.signIn(userDto);
    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: UserEntity){
        console.log(user);
    }

    @Get('telegram')
    async getTelegram(@Req() req){
        console.log(req);
        
    }


    
    // @Post('test')
    // @UseGuards(AuthGuard())
    // test(@Req()req){
    //     console.log(req.user);
    // }
}
