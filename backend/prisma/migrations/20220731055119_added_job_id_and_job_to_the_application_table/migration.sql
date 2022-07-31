/*
  Warnings:

  - Added the required column `jobId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
