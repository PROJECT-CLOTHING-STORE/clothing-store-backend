import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('clothes')
export class ClothesController {
    @Get('dummy')
    @UseGuards(AuthGuard())
    dummy(): string {
        return 'api resolved';
    }
}
