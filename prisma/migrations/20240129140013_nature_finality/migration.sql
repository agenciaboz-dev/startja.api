/*
  Warnings:

  - You are about to alter the column `finality` on the `Natureza` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Natureza` MODIFY `finality` INTEGER NOT NULL;
