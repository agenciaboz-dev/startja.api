/*
  Warnings:

  - Added the required column `notaId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `notaId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ie` VARCHAR(191) NOT NULL,
    `nifr` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `adjunct` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `exploration` VARCHAR(191) NOT NULL,
    `declarant` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notaFiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emission` DATETIME(3) NOT NULL,
    `seriesNfe` VARCHAR(191) NOT NULL,
    `clientSupplier` VARCHAR(191) NOT NULL,
    `issuer` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `situation` BOOLEAN NOT NULL,
    `dateTime` DATETIME(3) NULL,
    `paymentCondition` VARCHAR(191) NOT NULL,
    `paymentType` VARCHAR(191) NOT NULL,
    `freteType` VARCHAR(191) NOT NULL,
    `vehiclePlates` VARCHAR(191) NOT NULL,
    `vehicleUf` VARCHAR(191) NOT NULL,
    `shippingCompany` VARCHAR(191) NOT NULL,
    `productQnty` VARCHAR(191) NOT NULL,
    `productType` VARCHAR(191) NOT NULL,
    `bruteWeightKg` VARCHAR(191) NOT NULL,
    `liquidWeightKg` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `natureId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `internal` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `accNumber` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `notaFiscal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_natureId_fkey` FOREIGN KEY (`natureId`) REFERENCES `Natureza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
