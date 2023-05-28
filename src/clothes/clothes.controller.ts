import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Clothes } from '@prisma/client';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
    constructor(private clothesService: ClothesService) {}

    @Get('dummy')
    @UseGuards(AuthGuard())
    dummy(): string {
        return 'api resolved';
    }

    @Get('all')
    @UseGuards(AuthGuard())
    async getAllClothes(): Promise<Clothes[]> {
        return await this.clothesService.findAll();
    }
}
