import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payment } from '@prisma/client';
import { PaymentService } from './payment.service';
import { CreatePaymentRequestDto, FindPaymentsRequestDto } from './dto';
import { UsersService } from 'src/users/users.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService,
        private usersService: UsersService,
    ) {}

    @Get('all-by-userId')
    @UseGuards(AuthGuard())
    async getPaymentsByUserId(
        @Body() req: FindPaymentsRequestDto,
    ): Promise<Payment[]> {
        return await this.paymentService.findPaymentsByUserId(req.userId);
    }

    @Post('create')
    @UseGuards(AuthGuard())
    async addPayment(@Body() req: CreatePaymentRequestDto): Promise<Payment> {
        try {
            const { id: userId } = await this.usersService.findByUsername(
                req.username,
            );
            return await this.paymentService.createPayment(
                userId,
                req.clothId,
                req.quantity,
                req.size,
                req.email,
                req.firstName,
                req.lastName,
                req.city,
                req.province,
                req.postalCode,
            );
        } catch (e) {
            return null;
        }
    }
}
