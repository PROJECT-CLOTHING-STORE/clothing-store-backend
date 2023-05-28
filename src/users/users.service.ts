import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findAll(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }

    async findById(id: number): Promise<User> {
        return await this.prismaService.user.findFirst({
            where: {
                id: id,
            },
        });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.prismaService.user.findFirst({
            where: {
                username: username,
            },
        });
    }

    async createUser(username: string, password: string): Promise<User> {
        try {
            const user = await this.prismaService.user.create({
                data: {
                    username: username,
                    password: password,
                },
            });
            return user;
        } catch (error) {
            return null;
        }
    }
}
