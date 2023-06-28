-- AlterTable
ALTER TABLE "Clothes" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
