/*
  Warnings:

  - You are about to drop the column `series` on the `Property` table. All the data in the column will be lost.
  - Added the required column `nfe_number` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nfe_series` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `series`,
    ADD COLUMN `nfe_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `nfe_series` VARCHAR(191) NOT NULL;
