/*
  Warnings:

  - You are about to drop the column `iine` on the `Company` table. All the data in the column will be lost.
  - You are about to alter the column `number` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `phone` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `bairro` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `complemento` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `inscricao_estadual` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `regime_tributario` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `rua` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `clientSupplier` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `emission` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `issuer` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `nfe` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `productQnty` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `situation` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `cofins` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `cst` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `deferral` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `icms` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `motive` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to alter the column `cfop` on the `regraTributacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `_ProductTonotaFiscal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `indicadorEstadual` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adjunct` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricaoEstadual` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regimeTributario` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalInfo` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtdParcelas` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProductValue` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValue` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportedProductQuantity` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportedProductType` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorParcelas` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vencimentoParcelas` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additionalInfo` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aliquota` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cofinsSituation` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deferralPercentage` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiscalBenefit` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icmsOrigin` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icmsSituation` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentageBaseCalculo` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pisSituation` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ProductTonotaFiscal` DROP FOREIGN KEY `_ProductTonotaFiscal_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductTonotaFiscal` DROP FOREIGN KEY `_ProductTonotaFiscal_B_fkey`;

-- AlterTable
ALTER TABLE `Company` DROP COLUMN `iine`,
    ADD COLUMN `indicadorEstadual` INTEGER NOT NULL,
    ADD COLUMN `inscricaoEstadual` VARCHAR(191) NULL,
    MODIFY `number` INTEGER NOT NULL,
    MODIFY `phone` INTEGER NULL;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `bairro`,
    DROP COLUMN `complemento`,
    DROP COLUMN `inscricao_estadual`,
    DROP COLUMN `numero`,
    DROP COLUMN `regime_tributario`,
    DROP COLUMN `rua`,
    ADD COLUMN `adjunct` VARCHAR(191) NOT NULL,
    ADD COLUMN `businessName` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `inscricaoEstadual` VARCHAR(191) NOT NULL,
    ADD COLUMN `number` INTEGER NOT NULL,
    ADD COLUMN `regimeTributario` INTEGER NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notaFiscal` DROP COLUMN `clientSupplier`,
    DROP COLUMN `dateTime`,
    DROP COLUMN `emission`,
    DROP COLUMN `issuer`,
    DROP COLUMN `nfe`,
    DROP COLUMN `productQnty`,
    DROP COLUMN `productType`,
    DROP COLUMN `situation`,
    DROP COLUMN `value`,
    ADD COLUMN `emissionDate` TEXT NULL,
    ADD COLUMN `emissionTime` TEXT NULL,
    ADD COLUMN `freteInsurance` INTEGER NULL,
    ADD COLUMN `freteValue` INTEGER NULL,
    ADD COLUMN `generalInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `qtdParcelas` INTEGER NOT NULL,
    ADD COLUMN `totalProductValue` INTEGER NOT NULL,
    ADD COLUMN `totalValue` INTEGER NOT NULL,
    ADD COLUMN `transportedProductQuantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `transportedProductType` VARCHAR(191) NOT NULL,
    ADD COLUMN `valorParcelas` DOUBLE NOT NULL,
    ADD COLUMN `vencimentoParcelas` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `regraTributacao` DROP COLUMN `cofins`,
    DROP COLUMN `cst`,
    DROP COLUMN `deferral`,
    DROP COLUMN `icms`,
    DROP COLUMN `motive`,
    DROP COLUMN `percentage`,
    DROP COLUMN `rate`,
    ADD COLUMN `additionalInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `aliquota` INTEGER NOT NULL,
    ADD COLUMN `cofinsSituation` VARCHAR(191) NOT NULL,
    ADD COLUMN `deferralPercentage` VARCHAR(191) NOT NULL,
    ADD COLUMN `fiscalBenefit` VARCHAR(191) NOT NULL,
    ADD COLUMN `icmsOrigin` INTEGER NOT NULL,
    ADD COLUMN `icmsSituation` VARCHAR(191) NOT NULL,
    ADD COLUMN `percentageBaseCalculo` DOUBLE NOT NULL,
    ADD COLUMN `pisSituation` VARCHAR(191) NOT NULL,
    MODIFY `cfop` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ProductTonotaFiscal`;

-- CreateTable
CREATE TABLE `ProdutoNotaFiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unidadeComercial` VARCHAR(191) NOT NULL,
    `unidadeTributavel` VARCHAR(191) NOT NULL,
    `productQnty` INTEGER NOT NULL,
    `unitaryComercialValue` DOUBLE NOT NULL,
    `unitaryTributableValue` DOUBLE NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `notaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_notaFiscalToregraTributacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_notaFiscalToregraTributacao_AB_unique`(`A`, `B`),
    INDEX `_notaFiscalToregraTributacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `notaFiscal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_notaFiscalToregraTributacao` ADD CONSTRAINT `_notaFiscalToregraTributacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `notaFiscal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_notaFiscalToregraTributacao` ADD CONSTRAINT `_notaFiscalToregraTributacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
