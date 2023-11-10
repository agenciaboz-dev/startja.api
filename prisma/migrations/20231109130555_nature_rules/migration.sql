/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Access` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[document]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Company_cnpj_key` ON `Company`;

-- DropIndex
DROP INDEX `Company_customerId_fkey` ON `Company`;

-- DropIndex
DROP INDEX `Customer_cpf_key` ON `Customer`;

-- AlterTable
ALTER TABLE `Company` DROP COLUMN `cnpj`,
    ADD COLUMN `document` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `cpf`,
    ADD COLUMN `document` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Access`;

-- CreateTable
CREATE TABLE `Natureza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `finality` VARCHAR(191) NOT NULL,
    `motive` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regraTributacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uf` VARCHAR(191) NOT NULL,
    `icms` VARCHAR(191) NOT NULL,
    `cfop` VARCHAR(191) NOT NULL,
    `percentage` VARCHAR(191) NOT NULL,
    `motive` VARCHAR(191) NOT NULL,
    `rate` VARCHAR(191) NOT NULL,
    `deferral` VARCHAR(191) NOT NULL,
    `cst` VARCHAR(191) NOT NULL,
    `cofins` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_ProductToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NaturezaToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NaturezaToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_NaturezaToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Company_document_key` ON `Company`(`document`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_document_key` ON `Customer`(`document`);

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_certificateId_fkey` FOREIGN KEY (`certificateId`) REFERENCES `DigitalCertificate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToregraTributacao` ADD CONSTRAINT `_ProductToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToregraTributacao` ADD CONSTRAINT `_ProductToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NaturezaToregraTributacao` ADD CONSTRAINT `_NaturezaToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `Natureza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NaturezaToregraTributacao` ADD CONSTRAINT `_NaturezaToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
