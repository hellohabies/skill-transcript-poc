-- DropForeignKey
ALTER TABLE "Clo" DROP CONSTRAINT "Clo_courseId_fkey";

-- AlterTable
ALTER TABLE "Clo" ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Clo" ADD CONSTRAINT "Clo_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
