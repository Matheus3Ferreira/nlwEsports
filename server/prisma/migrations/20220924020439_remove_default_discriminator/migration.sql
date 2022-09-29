-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordUser" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL
);
INSERT INTO "new_DiscordUser" ("avatarId", "discordId", "discriminator", "email", "username") SELECT "avatarId", "discordId", "discriminator", "email", "username" FROM "DiscordUser";
DROP TABLE "DiscordUser";
ALTER TABLE "new_DiscordUser" RENAME TO "DiscordUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
