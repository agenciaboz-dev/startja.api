-- AlterTable
ALTER TABLE `regraTributacao` ADD COLUMN `interno_cofins_percentual_base_calculo` DOUBLE NULL,
    ADD COLUMN `interno_cofins_quantidade_base_de_calculo` DOUBLE NULL,
    ADD COLUMN `interno_pis_percentual_base_calculo` DOUBLE NULL,
    ADD COLUMN `interno_pis_quantidade_base_de_calculo` DOUBLE NULL;
