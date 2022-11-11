/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Article`;

-- CreateTable
CREATE TABLE `Serie` (
    `title` VARCHAR(191) NOT NULL,
    `date` INTEGER NOT NULL,
    `description` VARCHAR(2000) NOT NULL,
    `thumbmailURL` VARCHAR(2048) NOT NULL,

    PRIMARY KEY (`title`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
