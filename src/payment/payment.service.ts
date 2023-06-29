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

    async createPayment(userId: number, clothId: number) {
        try {
            const res = await this.prismaService.payment.create({
                data: {
                    userId: userId,
                    clothId: clothId,
                },
            });
            return res;
        } catch (error) {
            return null;
        }
    }
}
