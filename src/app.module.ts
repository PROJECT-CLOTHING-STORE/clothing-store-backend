import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { ClothesModule } from './clothes/clothes.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1h',
            },
        }),
        ClothesModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule {}
