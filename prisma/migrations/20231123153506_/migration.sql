/*
  Warnings:

  - You are about to drop the column `productId` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to alter the column `situation` on the `notaFiscal` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `notaFiscal` DROP FOREIGN KEY `notaFiscal_productId_fkey`;

-- AlterTable
ALTER TABLE `notaFiscal` DROP COLUMN `productId`,
    MODIFY `emission` VARCHAR(191) NOT NULL,
    MODIFY `situation` VARCHAR(191) NOT NULL,
    MODIFY `dateTime` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_ProductTonotaFiscal` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductTonotaFiscal_AB_unique`(`A`, `B`),
    INDEX `_ProductTonotaFiscal_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductTonotaFiscal` ADD CONSTRAINT `_ProductTonotaFiscal_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductTonotaFiscal` ADD CONSTRAINT `_ProductTonotaFiscal_B_fkey` FOREIGN KEY (`B`) REFERENCES `notaFiscal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
