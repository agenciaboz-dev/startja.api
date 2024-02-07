/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Natureza` DROP FOREIGN KEY `Natureza_user_id_fkey`;

-- DropTable
DROP TABLE `User`;

-- AddForeignKey
ALTER TABLE `Natureza` ADD CONSTRAINT `Natureza_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
