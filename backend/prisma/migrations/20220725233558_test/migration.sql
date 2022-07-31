/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `approved` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'FREELANCER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User.email_unique";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bio";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "approved" BOOLEAN NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "rate" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'FREELANCER',
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "rate" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(100) NOT NULL,
    "rate" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplyRequest" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job.userId_unique" ON "Job"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application.userId_unique" ON "Application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyRequest.userId_unique" ON "ApplyRequest"("userId");

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyRequest" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
