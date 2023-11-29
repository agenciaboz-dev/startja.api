/*
  Warnings:

  - You are about to drop the column `seriesNfe` on the `notaFiscal` table. All the data in the column will be lost.
  - Added the required column `nfe` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notaFiscal` DROP COLUMN `seriesNfe`,
    ADD COLUMN `nfe` VARCHAR(191) NOT NULL,
    ADD COLUMN `series` VARCHAR(191) NOT NULL;
