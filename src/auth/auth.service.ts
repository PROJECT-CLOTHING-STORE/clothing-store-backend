import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signInUser(username: string, password: string): Promise<string> {
        const user = await this.usersService.findByUsername(username);
        if (user === null) return null;
        else if (user.password !== password) return null;
        else
            return await this.signJwtToken({ id: user.id, username: username });
    }

    async validateUser(id: number, username: string): Promise<User> {
        try {
            const user = await this.usersService.findByUsername(username);
            if (user.id === id) return user;
            else return null;
        } catch (error) {
            return null;
        }
    }

    async signJwtToken(payload: {
        id: number;
        username: string;
    }): Promise<string> {
        const token = await this.jwtService.signAsync(payload);
        return token;
    }

    async register(username: string, password: string): Promise<User> {
        if (username.length === 0 || password.length === 0) return null;
        return await this.usersService.createUser(username, password);
    }
}
