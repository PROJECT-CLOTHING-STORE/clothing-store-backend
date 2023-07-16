import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
    constructor(private prismaService: PrismaService) {}

    async findPaymentsByUserId(userId: number): Promise<Payment[]> {
        try {
            const res = await this.prismaService.payment.findMany({
                where: {
                    userId: userId,
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

    async createPayment(userId: number, clothId: number, quantity: number) {
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
                },
            });
            return res;
        } catch (error) {
            return null;
        }
    }
}
