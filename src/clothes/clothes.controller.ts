import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Clothes } from '@prisma/client';
import { ClothesService } from './clothes.service';
import { CreateClothesRequest } from './dto';

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

    @Post('create')
    @UseGuards(AuthGuard())
    async createCloth(@Body() cloth: CreateClothesRequest): Promise<Clothes> {
        const res = await this.clothesService.addCloth(
            cloth.image,
            cloth.name,
            cloth.stock,
        );
        if (res == null) {
            return null;
        }
        return res;
    }
}
