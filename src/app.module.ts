import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import configuration from 'config/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '',
            load: [configuration],
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10000h' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
