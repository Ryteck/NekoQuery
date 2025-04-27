-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "stamp" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stamp" TEXT NOT NULL,
    CONSTRAINT "projects_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_stamp_key" ON "teams"("slug", "stamp");

-- CreateIndex
CREATE UNIQUE INDEX "teams_user_id_slug_key" ON "teams"("user_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_stamp_key" ON "projects"("slug", "stamp");

-- CreateIndex
CREATE UNIQUE INDEX "projects_team_id_slug_key" ON "projects"("team_id", "slug");
