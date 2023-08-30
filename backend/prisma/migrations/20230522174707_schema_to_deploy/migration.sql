/*
  Warnings:

  - You are about to drop the `MissingPerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MostWanted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MissingPerson" DROP CONSTRAINT "MissingPerson_userName_fkey";

-- DropForeignKey
ALTER TABLE "MostWanted" DROP CONSTRAINT "MostWanted_userName_fkey";

-- DropTable
DROP TABLE "MissingPerson";

-- DropTable
DROP TABLE "MostWanted";
