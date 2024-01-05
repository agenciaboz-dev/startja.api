/*
  Warnings:

  - You are about to drop the column `companyId` on the `notaFiscal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `notaFiscal` DROP FOREIGN KEY `notaFiscal_companyId_fkey`;

-- AlterTable
ALTER TABLE `notaFiscal` DROP COLUMN `companyId`;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_emitente_id_fkey` FOREIGN KEY (`emitente_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_destinatario_id_fkey` FOREIGN KEY (`destinatario_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
