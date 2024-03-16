/*
  Warnings:

  - You are about to drop the `SystemSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SystemEmailTemplateType" AS ENUM ('admin', 'customer');

-- DropTable
DROP TABLE "SystemSettings";

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "siteName" TEXT NOT NULL,
    "siteURL" TEXT NOT NULL,
    "siteEmailAddress" TEXT NOT NULL,
    "loginEnabled" BOOLEAN NOT NULL DEFAULT true,
    "loginDisabledMessage" TEXT,
    "createAccountEnabled" BOOLEAN DEFAULT true,
    "createAccountDisabledMessage" TEXT,
    "registrationEnabled" BOOLEAN DEFAULT true,
    "registrationDisabledMessage" TEXT,
    "forgotPasswordEnabled" BOOLEAN DEFAULT true,
    "forgotPasswordDisabledMessage" TEXT,
    "emailEnabled" BOOLEAN DEFAULT true,
    "emailFrom" TEXT,
    "emailServerUser" TEXT,
    "emailServerPassword" TEXT,
    "emailServerHost" TEXT,
    "emailServerPort" INTEGER DEFAULT 587,
    "emailServerSecure" BOOLEAN DEFAULT true,
    "businessName" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "cityState" TEXT,
    "postcodeZipCode" TEXT,
    "country" TEXT,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemEmailTemplate" (
    "id" SERIAL NOT NULL,
    "templateName" TEXT NOT NULL,
    "internalName" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "emailSubject" TEXT NOT NULL,
    "htmlBody" TEXT NOT NULL,
    "type" "SystemEmailTemplateType" NOT NULL DEFAULT 'customer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemEmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemEmailTemplate_templateName_key" ON "SystemEmailTemplate"("templateName");

-- CreateIndex
CREATE UNIQUE INDEX "SystemEmailTemplate_internalName_key" ON "SystemEmailTemplate"("internalName");
