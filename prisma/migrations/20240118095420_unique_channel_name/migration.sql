/*
  Warnings:

  - A unique constraint covering the columns `[channelName]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_channelName_key" ON "Room"("channelName");
