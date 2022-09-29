-- AlterTable
ALTER TABLE "Ad" ADD COLUMN "userDiscordId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL
);
