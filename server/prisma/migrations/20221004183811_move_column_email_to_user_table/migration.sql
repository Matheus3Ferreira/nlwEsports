/*
  Warnings:

  - You are about to drop the column `email` on the `DiscordUser` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordUser" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DiscordUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DiscordUser" ("avatarId", "discordId", "discriminator", "userId", "username") SELECT "avatarId", "discordId", "discriminator", "userId", "username" FROM "DiscordUser";
DROP TABLE "DiscordUser";
ALTER TABLE "new_DiscordUser" RENAME TO "DiscordUser";
CREATE UNIQUE INDEX "DiscordUser_userId_key" ON "DiscordUser"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT 'default@email.com',
    "password" TEXT,
    "phone" TEXT,
    "whatsapp" BOOLEAN
);
INSERT INTO "new_User" ("id", "password", "phone", "username", "whatsapp") SELECT "id", "password", "phone", "username", "whatsapp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
