/*
  Warnings:

  - You are about to drop the `_NaturezaToregraTributacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `natureza_id` to the `regraTributacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_NaturezaToregraTributacao` DROP FOREIGN KEY `_NaturezaToregraTributacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_NaturezaToregraTributacao` DROP FOREIGN KEY `_NaturezaToregraTributacao_B_fkey`;

-- AlterTable
ALTER TABLE `regraTributacao` ADD COLUMN `natureza_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_NaturezaToregraTributacao`;

-- AddForeignKey
ALTER TABLE `regraTributacao` ADD CONSTRAINT `regraTributacao_natureza_id_fkey` FOREIGN KEY (`natureza_id`) REFERENCES `Natureza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
