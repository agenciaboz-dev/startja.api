/*
  Warnings:

  - You are about to drop the column `recohimento` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `recohimento`,
    ADD COLUMN `recolhimento` INTEGER NOT NULL DEFAULT 1;
