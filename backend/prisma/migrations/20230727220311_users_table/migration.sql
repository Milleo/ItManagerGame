/*
  Warnings:

  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Char(72)` to `Char(36)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `password` CHAR(36) NOT NULL;
