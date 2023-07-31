import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
    constructor(private prismaService: PrismaService) {}

    async findPaymentsByUsername(username: string): Promise<Payment[]> {
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    username: username,
                },
            });
            const res = await this.prismaService.payment.findMany({
                where: {
                    userId: user.id,
                },
                include: {
                    user: true,
                    cloth: true,
                },
            });
            return res;
        } catch (error) {
            return null;
        }
    }

    async createPayment(
        userId: number,
        clothId: number,
        quantity: number,
        size: string,
        email: string,
        firstName: string,
        lastName: string,
        city: string,
        province: string,
        postalCode: number,
    ) {
        try {
            const cloth = await this.prismaService.clothes.findFirst({
                where: {
                    id: clothId,
                },
            });
            if (cloth.stock >= quantity) {
                await this.prismaService.clothes.update({
                    data: {
                        stock: {
                            decrement: quantity,
                        },
                    },
                    where: {
                        id: clothId,
                    },
                });
            }
            const res = await this.prismaService.payment.create({
                data: {
                    userId: userId,
                    clothId: clothId,
                    quantity: quantity,
                    size: size,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    province: province,
                    postalCode: postalCode,
                },
            });
            return res;
        } catch (error) {
            return null;
        }
    }
}
