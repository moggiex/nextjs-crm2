-- CreateTable
CREATE TABLE "UserActivityLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSettings" (
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

    CONSTRAINT "SystemSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserActivityLog" ADD CONSTRAINT "UserActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
