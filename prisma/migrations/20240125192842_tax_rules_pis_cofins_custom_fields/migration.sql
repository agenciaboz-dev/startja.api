-- AlterTable
ALTER TABLE `regraTributacao` ADD COLUMN `cofins_aliquota_porcentual` DOUBLE NULL,
    ADD COLUMN `cofins_aliquota_valor` DOUBLE NULL,
    ADD COLUMN `cofins_base_calculo` DOUBLE NULL,
    ADD COLUMN `cofins_quantidade_vendida` INTEGER NULL,
    ADD COLUMN `cofins_valor` DOUBLE NULL,
    ADD COLUMN `pis_aliquota_porcentual` DOUBLE NULL,
    ADD COLUMN `pis_aliquota_valor` DOUBLE NULL,
    ADD COLUMN `pis_base_calculo` DOUBLE NULL,
    ADD COLUMN `pis_quantidade_vendida` INTEGER NULL,
    ADD COLUMN `pis_valor` DOUBLE NULL;
