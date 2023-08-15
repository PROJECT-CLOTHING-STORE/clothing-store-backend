import { Test } from '@nestjs/testing';
import { ClothesService } from './clothes.service';
import { PrismaService } from 'src/prisma/prisma.service';

const mockPrismaService = {
    clothes: {
        findMany: jest.fn(),
    },
};

describe('ClothesService', () => {
    let clothesService: ClothesService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ClothesService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        clothesService = module.get<ClothesService>(ClothesService);
    });

    describe('findAll', () => {
        it('should call prisma service and return array of clothes', async () => {
            mockPrismaService.clothes.findMany.mockResolvedValue(['cloth']);

            const result = await clothesService.findAll();

            expect(mockPrismaService.clothes.findMany).toHaveBeenCalledTimes(1);
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(1);
        });
    });
});
