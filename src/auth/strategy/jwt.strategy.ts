import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(id: number, username: string): Promise<any> {
        const user = await this.authService.validateUser(id, username);
        if (user === null) return new UnauthorizedException();
        return user;
    }
}
