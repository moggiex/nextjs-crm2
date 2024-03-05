/*
  Warnings:

  - You are about to drop the column `content` on the `TicketMessage` table. All the data in the column will be lost.
  - Added the required column `message` to the `TicketMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketMessage" DROP COLUMN "content",
ADD COLUMN     "message" TEXT NOT NULL;
