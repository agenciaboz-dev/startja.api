-- DropForeignKey
ALTER TABLE `ProdutoNotaFiscal` DROP FOREIGN KEY `ProdutoNotaFiscal_notaId_fkey`;

-- DropForeignKey
ALTER TABLE `ProdutoNotaFiscal` DROP FOREIGN KEY `ProdutoNotaFiscal_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `ProdutoNotaFiscal` DROP FOREIGN KEY `ProdutoNotaFiscal_tax_rules_id_fkey`;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_tax_rules_id_fkey` FOREIGN KEY (`tax_rules_id`) REFERENCES `regraTributacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `notaFiscal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoNotaFiscal` ADD CONSTRAINT `ProdutoNotaFiscal_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
