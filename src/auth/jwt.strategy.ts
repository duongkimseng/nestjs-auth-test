import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { UserDto } from "src/user/models/dto/user.dto";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY 
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto>{
        const user = await this.authService.validateUser(payload);
        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }


}

