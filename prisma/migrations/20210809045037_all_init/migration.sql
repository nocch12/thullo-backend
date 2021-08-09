/*
  Warnings:

  - You are about to drop the column `authorId` on the `TaskLabel` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `TaskLabel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TaskLabel` DROP FOREIGN KEY `TaskLabel_ibfk_2`;

-- DropForeignKey
ALTER TABLE `TaskLabel` DROP FOREIGN KEY `TaskLabel_ibfk_1`;

-- AlterTable
ALTER TABLE `TaskLabel` DROP COLUMN `authorId`,
    DROP COLUMN `taskId`;

-- CreateTable
CREATE TABLE `LabelsOnTasks` (
    `labelId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`labelId`, `taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LabelsOnTasks` ADD FOREIGN KEY (`labelId`) REFERENCES `TaskLabel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabelsOnTasks` ADD FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
