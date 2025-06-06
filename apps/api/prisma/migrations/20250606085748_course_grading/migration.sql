/*
  Warnings:

  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `skillMappingRefId` on the `SkillLevel` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `SkillLevel` table. All the data in the column will be lost.
  - You are about to drop the column `titleTh` on the `SkillLevel` table. All the data in the column will be lost.
  - You are about to drop the `CourseClo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradeReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillEvaluation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descriptionEn` to the `SkillLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionTh` to the `SkillLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillId` to the `SkillLevel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F', 'X');

-- CreateEnum
CREATE TYPE "GradingResult" AS ENUM ('FAIL', 'PASS', 'GOOD', 'VERY_GOOD', 'EXCELLENT', 'X');

-- DropForeignKey
ALTER TABLE "CourseClo" DROP CONSTRAINT "CourseClo_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_courseSectionId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "SkillEvaluation" DROP CONSTRAINT "SkillEvaluation_skillLevelId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "role",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CourseSection" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CourseTeacher" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Curriculum" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SkillLevel" DROP COLUMN "skillMappingRefId",
DROP COLUMN "titleEn",
DROP COLUMN "titleTh",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "descriptionEn" TEXT NOT NULL,
ADD COLUMN     "descriptionTh" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skillId" TEXT NOT NULL,
ALTER COLUMN "level" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "CourseClo";

-- DropTable
DROP TABLE "CourseStudent";

-- DropTable
DROP TABLE "GradeReport";

-- DropTable
DROP TABLE "SkillEvaluation";

-- CreateTable
CREATE TABLE "Clo" (
    "id" TEXT NOT NULL,
    "type" "CloType" NOT NULL,
    "clo" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Clo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillLevelMethod" (
    "id" TEXT NOT NULL,
    "skillLevelId" TEXT NOT NULL,
    "methodNameTh" TEXT NOT NULL,
    "methodNameEn" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SkillLevelMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillLevelCriteria" (
    "id" TEXT NOT NULL,
    "skillLevelId" TEXT NOT NULL,
    "criteriaNameTh" TEXT NOT NULL,
    "criteriaNameEn" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SkillLevelCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloSkillLevelCriteria" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "cloId" TEXT NOT NULL,
    "skillLevelCriteriaId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CloSkillLevelCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseGradingCriteria" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "grade" "Grade" NOT NULL,
    "minScore" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CourseGradingCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseSectionId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCourseGrading" (
    "id" TEXT NOT NULL,
    "studentCourseId" TEXT NOT NULL,
    "gradingDate" TIMESTAMP(3) NOT NULL,
    "grade" "Grade" NOT NULL DEFAULT 'X',
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StudentCourseGrading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradingCloResult" (
    "id" TEXT NOT NULL,
    "studentCourseGradingId" TEXT NOT NULL,
    "cloId" TEXT NOT NULL,
    "result" "GradingResult" NOT NULL DEFAULT 'X',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GradingCloResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Clo_isDeleted_deletedAt_idx" ON "Clo"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "SkillLevelMethod_isDeleted_deletedAt_idx" ON "SkillLevelMethod"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "SkillLevelCriteria_isDeleted_deletedAt_idx" ON "SkillLevelCriteria"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "CloSkillLevelCriteria_isDeleted_deletedAt_idx" ON "CloSkillLevelCriteria"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "CourseGradingCriteria_isDeleted_deletedAt_idx" ON "CourseGradingCriteria"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "StudentCourse_isDeleted_deletedAt_idx" ON "StudentCourse"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "StudentCourseGrading_isDeleted_deletedAt_idx" ON "StudentCourseGrading"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "GradingCloResult_isDeleted_deletedAt_idx" ON "GradingCloResult"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Admin_isDeleted_deletedAt_idx" ON "Admin"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Course_isDeleted_deletedAt_idx" ON "Course"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "CourseSection_isDeleted_deletedAt_idx" ON "CourseSection"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "CourseTeacher_isDeleted_deletedAt_idx" ON "CourseTeacher"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Curriculum_isDeleted_deletedAt_idx" ON "Curriculum"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Faculty_isDeleted_deletedAt_idx" ON "Faculty"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Skill_isDeleted_deletedAt_idx" ON "Skill"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "SkillLevel_isDeleted_deletedAt_idx" ON "SkillLevel"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Student_isDeleted_deletedAt_idx" ON "Student"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "Teacher_isDeleted_deletedAt_idx" ON "Teacher"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "University_isDeleted_deletedAt_idx" ON "University"("isDeleted", "deletedAt");

-- CreateIndex
CREATE INDEX "User_isDeleted_deletedAt_idx" ON "User"("isDeleted", "deletedAt");

-- AddForeignKey
ALTER TABLE "Clo" ADD CONSTRAINT "Clo_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLevel" ADD CONSTRAINT "SkillLevel_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLevelMethod" ADD CONSTRAINT "SkillLevelMethod_skillLevelId_fkey" FOREIGN KEY ("skillLevelId") REFERENCES "SkillLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLevelCriteria" ADD CONSTRAINT "SkillLevelCriteria_skillLevelId_fkey" FOREIGN KEY ("skillLevelId") REFERENCES "SkillLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloSkillLevelCriteria" ADD CONSTRAINT "CloSkillLevelCriteria_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloSkillLevelCriteria" ADD CONSTRAINT "CloSkillLevelCriteria_cloId_fkey" FOREIGN KEY ("cloId") REFERENCES "Clo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloSkillLevelCriteria" ADD CONSTRAINT "CloSkillLevelCriteria_skillLevelCriteriaId_fkey" FOREIGN KEY ("skillLevelCriteriaId") REFERENCES "SkillLevelCriteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseGradingCriteria" ADD CONSTRAINT "CourseGradingCriteria_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_courseSectionId_fkey" FOREIGN KEY ("courseSectionId") REFERENCES "CourseSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourseGrading" ADD CONSTRAINT "StudentCourseGrading_studentCourseId_fkey" FOREIGN KEY ("studentCourseId") REFERENCES "StudentCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradingCloResult" ADD CONSTRAINT "GradingCloResult_studentCourseGradingId_fkey" FOREIGN KEY ("studentCourseGradingId") REFERENCES "StudentCourseGrading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradingCloResult" ADD CONSTRAINT "GradingCloResult_cloId_fkey" FOREIGN KEY ("cloId") REFERENCES "Clo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
