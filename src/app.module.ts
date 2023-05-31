import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import configuration from 'config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { ClothesModule } from './clothes/clothes.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

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
        JwtModule,
        ClothesModule,
        PassportModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
    exports: [PassportModule, JwtModule],
})
export class AppModule {}
