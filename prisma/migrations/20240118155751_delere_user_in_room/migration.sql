/*
  Warnings:

  - You are about to drop the `UserInRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserInRoom" DROP CONSTRAINT "UserInRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserInRoom" DROP CONSTRAINT "UserInRoom_userId_fkey";

-- DropTable
DROP TABLE "UserInRoom";
