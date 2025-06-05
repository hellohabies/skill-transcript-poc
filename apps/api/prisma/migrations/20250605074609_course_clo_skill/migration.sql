/*
  Warnings:

  - You are about to drop the column `birthDay` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `birthMonth` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `birthYear` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledDay` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledMonth` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledYear` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[universityStudentId,affiliatedCurriculumId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrolledDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityStudentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityTeacherId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CloType" AS ENUM ('K', 'S', 'A');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('SPECIFIC', 'GENERAL', 'MAIN', 'OTHER');

-- DropIndex
DROP INDEX "Student_studentId_affiliatedCurriculumId_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "birthDay",
DROP COLUMN "birthMonth",
DROP COLUMN "birthYear",
DROP COLUMN "enrolledDay",
DROP COLUMN "enrolledMonth",
DROP COLUMN "enrolledYear",
DROP COLUMN "studentId",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "enrolledDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "universityStudentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "teacherId",
ADD COLUMN     "universityTeacherId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CourseClo" (
    "id" TEXT NOT NULL,
    "type" "CloType" NOT NULL,
    "clo" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseClo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillEvaluation" (
    "id" TEXT NOT NULL,
    "evaluation" TEXT NOT NULL,
    "evaluationCriteria" TEXT NOT NULL,
    "skillLevelId" TEXT NOT NULL,

    CONSTRAINT "SkillEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillLevel" (
    "id" TEXT NOT NULL,
    "skillMappingRefId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "titleTh" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,

    CONSTRAINT "SkillLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "skillMappingRefId" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionTh" TEXT NOT NULL,
    "type" "SkillType" NOT NULL,
    "isMainSkill" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "skillMappingRefId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionTh" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTeacher" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "courseSectionId" TEXT NOT NULL,

    CONSTRAINT "CourseTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStudent" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseSectionId" TEXT,

    CONSTRAINT "CourseStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeReport" (
    "id" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GradeReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_universityStudentId_affiliatedCurriculumId_key" ON "Student"("universityStudentId", "affiliatedCurriculumId");

-- AddForeignKey
ALTER TABLE "CourseClo" ADD CONSTRAINT "CourseClo_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillEvaluation" ADD CONSTRAINT "SkillEvaluation_skillLevelId_fkey" FOREIGN KEY ("skillLevelId") REFERENCES "SkillLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTeacher" ADD CONSTRAINT "CourseTeacher_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTeacher" ADD CONSTRAINT "CourseTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTeacher" ADD CONSTRAINT "CourseTeacher_courseSectionId_fkey" FOREIGN KEY ("courseSectionId") REFERENCES "CourseSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_courseSectionId_fkey" FOREIGN KEY ("courseSectionId") REFERENCES "CourseSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
