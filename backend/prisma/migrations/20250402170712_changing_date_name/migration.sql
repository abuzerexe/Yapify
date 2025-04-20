/*
  Warnings:

  - You are about to drop the column `date` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "date",
ADD COLUMN     "createdAt" TEXT NOT NULL;
