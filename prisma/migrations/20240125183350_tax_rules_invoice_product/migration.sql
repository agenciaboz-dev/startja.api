/*
  Warnings:

  - Added the required column `tax_rules_id` to the `ProdutoNotaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProdutoNotaFiscal` ADD COLUMN `tax_rules_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_tax_rules_id_fkey` FOREIGN KEY (`tax_rules_id`) REFERENCES `regraTributacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
