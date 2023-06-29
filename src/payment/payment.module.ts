import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    providers: [PaymentService],
    controllers: [PaymentController],
    imports: [
        PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
})
export class PaymentModule {}
