import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    providers: [ClothesService],
    controllers: [ClothesController],
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
    ],
})
export class ClothesModule {}
