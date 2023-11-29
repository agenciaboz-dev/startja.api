/*
  Warnings:

  - You are about to drop the column `customerId` on the `notaFiscal` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notaFiscal` DROP FOREIGN KEY `notaFiscal_customerId_fkey`;

-- AlterTable
ALTER TABLE `notaFiscal` DROP COLUMN `customerId`,
    ADD COLUMN `companyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
