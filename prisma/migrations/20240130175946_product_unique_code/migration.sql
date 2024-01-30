/*
  Warnings:

  - A unique constraint covering the columns `[codigo_externo]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Product` ALTER COLUMN `codigo_externo` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Product_codigo_externo_key` ON `Product`(`codigo_externo`);
