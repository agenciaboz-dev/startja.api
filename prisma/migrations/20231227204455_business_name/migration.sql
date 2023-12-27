/*
  Warnings:

  - You are about to drop the column `businessName` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `businessName` VARCHAR(191) NOT NULL DEFAULT 'teste';

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `businessName`;
