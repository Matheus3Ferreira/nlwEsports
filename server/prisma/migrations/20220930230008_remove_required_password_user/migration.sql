-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "whatsapp" BOOLEAN
);
INSERT INTO "new_User" ("id", "password", "phone", "username", "whatsapp") SELECT "id", "password", "phone", "username", "whatsapp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
