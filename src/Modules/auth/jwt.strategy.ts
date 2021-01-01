import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'myBlogSecret',
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity>{
        const {username} = payload;
        const user = await this.userRepo.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }
}
