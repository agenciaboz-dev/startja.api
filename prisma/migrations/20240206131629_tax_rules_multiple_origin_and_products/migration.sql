/*
  Warnings:

  - You are about to drop the column `product_id` on the `regraTributacao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `regraTributacao` DROP FOREIGN KEY `regraTributacao_product_id_fkey`;

-- AlterTable
ALTER TABLE `regraTributacao` DROP COLUMN `product_id`,
    MODIFY `destino` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `_ProductToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_ProductToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToregraTributacao` ADD CONSTRAINT `_ProductToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToregraTributacao` ADD CONSTRAINT `_ProductToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
