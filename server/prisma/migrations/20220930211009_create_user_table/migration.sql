/*
  Warnings:

  - You are about to drop the column `userDiscordId` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `userId` to the `DiscordUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "whatsapp" BOOLEAN
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ad_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("createdAt", "discord", "gameId", "hourEnd", "hourStart", "id", "name", "useVoiceChannel", "weekDays", "yearsPlaying") SELECT "createdAt", "discord", "gameId", "hourEnd", "hourStart", "id", "name", "useVoiceChannel", "weekDays", "yearsPlaying" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
CREATE TABLE "new_DiscordUser" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DiscordUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DiscordUser" ("avatarId", "discordId", "discriminator", "email", "username") SELECT "avatarId", "discordId", "discriminator", "email", "username" FROM "DiscordUser";
DROP TABLE "DiscordUser";
ALTER TABLE "new_DiscordUser" RENAME TO "DiscordUser";
CREATE UNIQUE INDEX "DiscordUser_userId_key" ON "DiscordUser"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
