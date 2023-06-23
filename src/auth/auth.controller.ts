import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        const token = await this.authService.signInUser(
            loginRequest.username,
            loginRequest.password,
        );
        if (token !== null) {
            const response: LoginResponse = {
                username: loginRequest.username,
                accessToken: token,
                message: 'success',
            };
            return response;
        } else {
            const response: LoginResponse = {
                username: loginRequest.username,
                accessToken: null,
                message: 'Failed',
            };
            return response;
        }
    }

    @Post('register')
    async register(
        @Body() registerRequest: RegisterRequest,
    ): Promise<RegisterResponse> {
        const user = await this.authService.register(
            registerRequest.username,
            registerRequest.password,
        );
        if (user !== null) {
            const response: RegisterResponse = {
                username: user.username,
                message: 'Success',
            };
            return response;
        } else {
            const response: RegisterResponse = {
                username: null,
                message: 'Failed',
            };
            return response;
        }
    }
}
