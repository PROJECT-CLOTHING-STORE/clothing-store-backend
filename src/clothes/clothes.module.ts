import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [ClothesService],
    controllers: [ClothesController],
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        PrismaModule,
    ],
})
export class ClothesModule {}
