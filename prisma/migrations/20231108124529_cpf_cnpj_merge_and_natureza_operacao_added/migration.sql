/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Customer` table. All the data in the column will be lost.
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

-- CreateTable
CREATE TABLE `Natureza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `finality` VARCHAR(191) NOT NULL,
    `motive` VARCHAR(191) NOT NULL,
    `ruleId` INTEGER NOT NULL,

    UNIQUE INDEX `Natureza_id_key`(`id`),
    UNIQUE INDEX `Natureza_ruleId_key`(`ruleId`)
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
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `regraTributacao_id_key`(`id`),
    UNIQUE INDEX `regraTributacao_productId_key`(`productId`)
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
ALTER TABLE `Natureza` ADD CONSTRAINT `Natureza_ruleId_fkey` FOREIGN KEY (`ruleId`) REFERENCES `regraTributacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regraTributacao` ADD CONSTRAINT `regraTributacao_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
