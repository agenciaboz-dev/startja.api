/*
  Warnings:

  - You are about to drop the column `unidadeTributavel` on the `ProdutoNotaFiscal` table. All the data in the column will be lost.
  - Added the required column `emissionFinality` to the `Natureza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icmsOrigin` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerPresence` to the `ProdutoNotaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Natureza` ADD COLUMN `emissionFinality` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `icmsOrigin` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ProdutoNotaFiscal` DROP COLUMN `unidadeTributavel`,
    ADD COLUMN `buyerPresence` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Property` ADD COLUMN `series` VARCHAR(191) NOT NULL;
