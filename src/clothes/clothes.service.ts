import { Injectable } from '@nestjs/common';
import { Clothes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClothesService {
    constructor(private prismaService: PrismaService) {}

    async findAll(): Promise<Clothes[]> {
        return await this.prismaService.clothes.findMany();
    }
}
