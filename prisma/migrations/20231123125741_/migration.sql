/*
  Warnings:

  - You are about to drop the column `notaId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_notaId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `notaId`;

-- AlterTable
ALTER TABLE `notaFiscal` ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
