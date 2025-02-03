/*
  Warnings:

  - Added the required column `database_connection_id` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "database_connections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "database_connection_id" TEXT NOT NULL,
    CONSTRAINT "tables_database_connection_id_fkey" FOREIGN KEY ("database_connection_id") REFERENCES "database_connections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tables" ("id", "name") SELECT "id", "name" FROM "tables";
DROP TABLE "tables";
ALTER TABLE "new_tables" RENAME TO "tables";
CREATE UNIQUE INDEX "tables_name_database_connection_id_key" ON "tables"("name", "database_connection_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "database_connections_name_key" ON "database_connections"("name");
