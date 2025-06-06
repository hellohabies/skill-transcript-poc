/*
  Warnings:

  - You are about to drop the column `clo` on the `Clo` table. All the data in the column will be lost.
  - Added the required column `name` to the `Clo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clo" DROP COLUMN "clo",
ADD COLUMN     "name" TEXT NOT NULL;
