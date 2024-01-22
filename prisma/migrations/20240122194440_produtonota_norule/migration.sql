/*
  Warnings:

  - You are about to drop the column `rule_id` on the `ProdutoNotaFiscal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProdutoNotaFiscal` DROP FOREIGN KEY `ProdutoNotaFiscal_rule_id_fkey`;

-- AlterTable
ALTER TABLE `ProdutoNotaFiscal` DROP COLUMN `rule_id`;
