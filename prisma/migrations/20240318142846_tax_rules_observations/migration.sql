/*
  Warnings:

  - You are about to drop the column `observations` on the `Natureza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Natureza` DROP COLUMN `observations`;

-- AlterTable
ALTER TABLE `regraTributacao` ADD COLUMN `observations` VARCHAR(191) NOT NULL DEFAULT '';
