/*
  Warnings:

  - You are about to alter the column `aliquota` on the `regraTributacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `nature_id` to the `notaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notaFiscal` ADD COLUMN `nature_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `regraTributacao` ADD COLUMN `cest` INTEGER NULL,
    ADD COLUMN `codigo_beneficio_fiscal` VARCHAR(191) NULL,
    ADD COLUMN `icms_aliquota_st` DOUBLE NULL,
    ADD COLUMN `icms_origem` INTEGER NULL,
    ADD COLUMN `icms_percentual_diferimento` DOUBLE NULL,
    ADD COLUMN `icms_reducao_base_calculo` DOUBLE NULL,
    ADD COLUMN `icms_valor_desonerado` DOUBLE NULL,
    MODIFY `aliquota` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `notaFiscal` ADD CONSTRAINT `notaFiscal_nature_id_fkey` FOREIGN KEY (`nature_id`) REFERENCES `Natureza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
