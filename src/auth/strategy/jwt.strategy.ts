import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any): Promise<any> {
        const { id, username } = payload;
        const user = await this.authService.validateUser(id, username);
        if (user === null) throw new UnauthorizedException();
        return user;
    }
}
