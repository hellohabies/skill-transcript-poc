/*
  Warnings:

  - You are about to drop the column `courseId` on the `Clo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clo" DROP CONSTRAINT "Clo_courseId_fkey";

-- AlterTable
ALTER TABLE "Clo" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "CourseClo" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "cloId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CourseClo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseClo_isDeleted_deletedAt_idx" ON "CourseClo"("isDeleted", "deletedAt");

-- AddForeignKey
ALTER TABLE "CourseClo" ADD CONSTRAINT "CourseClo_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseClo" ADD CONSTRAINT "CourseClo_cloId_fkey" FOREIGN KEY ("cloId") REFERENCES "Clo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
