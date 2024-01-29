/*
  Warnings:

  - Made the column `cfop` on table `regraTributacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `regraTributacao` MODIFY `cfop` INTEGER NOT NULL;
