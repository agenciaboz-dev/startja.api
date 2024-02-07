-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `observations` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `show_funrunral_on_invoices` BOOLEAN NOT NULL DEFAULT true;
