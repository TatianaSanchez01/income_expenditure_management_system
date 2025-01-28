-- CreateEnum
CREATE TYPE "Enum_RoleName" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "Enum_RoleName" NOT NULL DEFAULT 'USER';
