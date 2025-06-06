-- CreateTable
CREATE TABLE "CourseCloWeight" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "cloId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CourseCloWeight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseCloWeight_isDeleted_deletedAt_idx" ON "CourseCloWeight"("isDeleted", "deletedAt");

-- AddForeignKey
ALTER TABLE "CourseCloWeight" ADD CONSTRAINT "CourseCloWeight_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCloWeight" ADD CONSTRAINT "CourseCloWeight_cloId_fkey" FOREIGN KEY ("cloId") REFERENCES "Clo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
