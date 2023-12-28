/*
  Warnings:

  - You are about to drop the column `icmsOrigin` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `buyerPresence` on the `ProdutoNotaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeComercial` on the `ProdutoNotaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `unitaryComercialValue` on the `ProdutoNotaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `unitaryTributableValue` on the `ProdutoNotaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `bruteWeightKg` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `emissionDate` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `emissionTime` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `freteInsurance` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `freteType` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `freteValue` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `generalInfo` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `liquidWeightKg` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `natureId` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `paymentCondition` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `qtdParcelas` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCompany` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `totalProductValue` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `transportedProductQuantity` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `transportedProductType` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `valorParcelas` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `vehiclePlates` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleUf` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `vencimentoParcelas` on the `notaFiscal` table. All the data in the column will be lost.
  - You are about to drop the column `additionalInfo` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `cofinsSituation` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `deferralPercentage` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `fiscalBenefit` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `icmsOrigin` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `icmsSituation` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `percentageBaseCalculo` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `pisSituation` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `regraTributacao` table. All the data in the column will be lost.
  - You are about to drop the `_NaturezaToregraTributacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToregraTributacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_notaFiscalToregraTributacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rule_id` to the `ProdutoNotaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade` to the `ProdutoNotaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitaryValue` to the `ProdutoNotaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumidor_final` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinatario_id` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emitente_id` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalidade_emissao` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local_destino` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natureza_operacao` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presenca_comprador` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serie` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_documento` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_frete` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_produtos` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_seguro` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_total` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cofins_situacao_tributaria` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icms_modalidade_base_calculo` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icms_origem` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icms_situacao_tributaria` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pis_situacao_tributaria` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_NaturezaToregraTributacao` DROP FOREIGN KEY `_NaturezaToregraTributacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_NaturezaToregraTributacao` DROP FOREIGN KEY `_NaturezaToregraTributacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToregraTributacao` DROP FOREIGN KEY `_ProductToregraTributacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToregraTributacao` DROP FOREIGN KEY `_ProductToregraTributacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_notaFiscalToregraTributacao` DROP FOREIGN KEY `_notaFiscalToregraTributacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_notaFiscalToregraTributacao` DROP FOREIGN KEY `_notaFiscalToregraTributacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `notaFiscal` DROP FOREIGN KEY `notaFiscal_natureId_fkey`;

-- DropForeignKey
ALTER TABLE `notaFiscal` DROP FOREIGN KEY `notaFiscal_propertyId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `icmsOrigin`;

-- AlterTable
ALTER TABLE `ProdutoNotaFiscal` DROP COLUMN `buyerPresence`,
    DROP COLUMN `unidadeComercial`,
    DROP COLUMN `unitaryComercialValue`,
    DROP COLUMN `unitaryTributableValue`,
    ADD COLUMN `rule_id` INTEGER NOT NULL,
    ADD COLUMN `unidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `unitaryValue` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `notaFiscal` DROP COLUMN `bruteWeightKg`,
    DROP COLUMN `emissionDate`,
    DROP COLUMN `emissionTime`,
    DROP COLUMN `freteInsurance`,
    DROP COLUMN `freteType`,
    DROP COLUMN `freteValue`,
    DROP COLUMN `generalInfo`,
    DROP COLUMN `liquidWeightKg`,
    DROP COLUMN `natureId`,
    DROP COLUMN `paymentCondition`,
    DROP COLUMN `paymentType`,
    DROP COLUMN `propertyId`,
    DROP COLUMN `qtdParcelas`,
    DROP COLUMN `shippingCompany`,
    DROP COLUMN `totalProductValue`,
    DROP COLUMN `totalValue`,
    DROP COLUMN `transportedProductQuantity`,
    DROP COLUMN `transportedProductType`,
    DROP COLUMN `valorParcelas`,
    DROP COLUMN `vehiclePlates`,
    DROP COLUMN `vehicleUf`,
    DROP COLUMN `vencimentoParcelas`,
    ADD COLUMN `consumidor_final` INTEGER NOT NULL,
    ADD COLUMN `destinatario_id` INTEGER NOT NULL,
    ADD COLUMN `emissionDatetime` TEXT NULL,
    ADD COLUMN `emitente_id` INTEGER NOT NULL,
    ADD COLUMN `finalidade_emissao` INTEGER NOT NULL,
    ADD COLUMN `local_destino` INTEGER NOT NULL,
    ADD COLUMN `natureza_operacao` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero` INTEGER NOT NULL,
    ADD COLUMN `presenca_comprador` INTEGER NOT NULL,
    ADD COLUMN `serie` INTEGER NOT NULL,
    ADD COLUMN `tipo_documento` INTEGER NOT NULL,
    ADD COLUMN `valor_frete` DOUBLE NOT NULL,
    ADD COLUMN `valor_produtos` DOUBLE NOT NULL,
    ADD COLUMN `valor_seguro` DOUBLE NOT NULL,
    ADD COLUMN `valor_total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `regraTributacao` DROP COLUMN `additionalInfo`,
    DROP COLUMN `cofinsSituation`,
    DROP COLUMN `deferralPercentage`,
    DROP COLUMN `fiscalBenefit`,
    DROP COLUMN `icmsOrigin`,
    DROP COLUMN `icmsSituation`,
    DROP COLUMN `percentageBaseCalculo`,
    DROP COLUMN `pisSituation`,
    DROP COLUMN `uf`,
    ADD COLUMN `cofins_situacao_tributaria` VARCHAR(191) NOT NULL,
    ADD COLUMN `icms_modalidade_base_calculo` INTEGER NOT NULL,
    ADD COLUMN `icms_origem` INTEGER NOT NULL,
    ADD COLUMN `icms_situacao_tributaria` VARCHAR(191) NOT NULL,
    ADD COLUMN `pis_situacao_tributaria` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_NaturezaToregraTributacao`;

-- DropTable
DROP TABLE `_ProductToregraTributacao`;

-- DropTable
DROP TABLE `_notaFiscalToregraTributacao`;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_rule_id_fkey` FOREIGN KEY (`rule_id`) REFERENCES `regraTributacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
