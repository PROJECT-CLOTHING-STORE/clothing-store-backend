import { Injectable } from '@nestjs/common';
import { Clothes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClothesService {
    constructor(private prismaService: PrismaService) {}

    async findAll(): Promise<Clothes[]> {
        return await this.prismaService.clothes.findMany();
    }

    async addCloth(
        image: string,
        name: string,
        stock: number,
    ): Promise<Clothes> {
        try {
            const res = await this.prismaService.clothes.create({
                data: {
                    image: image,
                    name: name,
                    stock: stock,
                },
            });
            console.log(res);
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
