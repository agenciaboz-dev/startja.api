-- DropForeignKey
ALTER TABLE `ProdutoNotaFiscal` DROP FOREIGN KEY `ProdutoNotaFiscal_rule_id_fkey`;

-- AlterTable
ALTER TABLE `ProdutoNotaFiscal` MODIFY `rule_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_rule_id_fkey` FOREIGN KEY (`rule_id`) REFERENCES `regraTributacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
