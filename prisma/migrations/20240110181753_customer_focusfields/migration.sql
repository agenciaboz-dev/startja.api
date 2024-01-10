-- AlterTable
ALTER TABLE `Company` ALTER COLUMN `businessName` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `businessName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `discrimina_impostos` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `enviar_email_destinatario` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `habilita_nfce` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `habilita_nfe` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `inscricao_municipal` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `proximo_numero_nfe` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `serie_nfe` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `DigitalCertificate` ADD COLUMN `password` TEXT NOT NULL DEFAULT '';
