/*
  Warnings:

  - You are about to alter the column `type` on the `Natureza` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `emissionFinality` on the `Natureza` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `icms_origem` on the `regraTributacao` table. All the data in the column will be lost.
  - Added the required column `destino` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origem` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Natureza` MODIFY `type` INTEGER NOT NULL,
    MODIFY `emissionFinality` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `regraTributacao` DROP COLUMN `icms_origem`,
    ADD COLUMN `destino` VARCHAR(191) NOT NULL,
    ADD COLUMN `origem` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_NaturezaToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NaturezaToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_NaturezaToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `regraTributacao` ADD CONSTRAINT `regraTributacao_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NaturezaToregraTributacao` ADD CONSTRAINT `_NaturezaToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Natureza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NaturezaToregraTributacao` ADD CONSTRAINT `_NaturezaToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
