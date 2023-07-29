import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers: [PaymentService],
    controllers: [PaymentController],
    imports: [
        PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UsersModule,
    ],
})
export class PaymentModule {}
