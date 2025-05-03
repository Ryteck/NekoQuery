/*
  Warnings:

  - You are about to drop the column `user_id` on the `teams` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "participants" (
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "nano_id_nonce" TEXT NOT NULL,
    "nano_id_ciphertext" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "team_id"),
    CONSTRAINT "participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participants_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "stamp" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_teams" ("id", "name", "slug", "stamp") SELECT "id", "name", "slug", "stamp" FROM "teams";
DROP TABLE "teams";
ALTER TABLE "new_teams" RENAME TO "teams";
CREATE UNIQUE INDEX "teams_slug_stamp_key" ON "teams"("slug", "stamp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
