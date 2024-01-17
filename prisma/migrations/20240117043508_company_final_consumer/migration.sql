/*
  Warnings:

  - Added the required column `propriedade_id` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `final_consumer` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `notaFiscal` ADD COLUMN `propriedade_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
