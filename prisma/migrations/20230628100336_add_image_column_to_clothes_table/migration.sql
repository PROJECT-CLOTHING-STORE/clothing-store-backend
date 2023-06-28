/*
  Warnings:

  - Added the required column `image` to the `Clothes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clothes" ADD COLUMN     "image" VARCHAR(200) NOT NULL;
