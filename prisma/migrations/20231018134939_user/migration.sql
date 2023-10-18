-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `register_date` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `certificateId` INTEGER NOT NULL,

    UNIQUE INDEX `Customer_certificateId_key`(`certificateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DigitalCertificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expiry` VARCHAR(191) NOT NULL,
    `certificate` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_certificateId_fkey` FOREIGN KEY (`certificateId`) REFERENCES `DigitalCertificate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
