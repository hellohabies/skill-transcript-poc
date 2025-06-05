-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nameTitle" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "emblemImageSrc" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "degreeName" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "affiliatedCurriculumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "birthDay" INTEGER NOT NULL,
    "birthMonth" INTEGER NOT NULL,
    "birthYear" INTEGER NOT NULL,
    "enrolledDay" INTEGER NOT NULL,
    "enrolledMonth" INTEGER NOT NULL,
    "enrolledYear" INTEGER NOT NULL,
    "affiliatedCurriculumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_affiliatedCurriculumId_key" ON "Student"("studentId", "affiliatedCurriculumId");

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_affiliatedCurriculumId_fkey" FOREIGN KEY ("affiliatedCurriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_affiliatedCurriculumId_fkey" FOREIGN KEY ("affiliatedCurriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
