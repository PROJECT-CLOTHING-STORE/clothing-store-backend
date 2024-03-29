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
        price: number,
        tags: string[],
        description: string,
    ): Promise<Clothes> {
        try {
            const res = await this.prismaService.clothes.create({
                data: {
                    image: image,
                    name: name,
                    stock: stock,
                    price: price,
                    tags: tags,
                    description: description !== null ? description : '',
                },
            });
            return res;
        } catch (e) {
            return null;
        }
    }

    async getClothById(id: number): Promise<Clothes> {
        try {
            const res = await this.prismaService.clothes.findFirst({
                where: {
                    id: id,
                },
            });
            return res;
        } catch (e) {
            return null;
        }
    }
}
