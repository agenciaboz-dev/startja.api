/*
  Warnings:

  - You are about to drop the column `show_funrunral_on_invoices` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `show_funrunral_on_invoices`,
    ADD COLUMN `show_funrural_on_invoices` BOOLEAN NOT NULL DEFAULT true;
