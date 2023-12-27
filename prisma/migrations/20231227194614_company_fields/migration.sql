/*
  Warnings:

  - Made the column `inscricaoEstadual` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Company` MODIFY `inscricaoEstadual` VARCHAR(191) NOT NULL,
    MODIFY `indicadorEstadual` VARCHAR(191) NOT NULL,
    MODIFY `adjunct` VARCHAR(191) NULL,
    MODIFY `number` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;
