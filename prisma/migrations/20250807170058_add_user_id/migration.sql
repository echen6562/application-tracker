/*
  Warnings:

  - Added the required column `userID` to the `job_applications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job_applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateApplied" DATETIME NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_job_applications" ("company", "createdAt", "dateApplied", "id", "role", "status", "updatedAt") SELECT "company", "createdAt", "dateApplied", "id", "role", "status", "updatedAt" FROM "job_applications";
DROP TABLE "job_applications";
ALTER TABLE "new_job_applications" RENAME TO "job_applications";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
