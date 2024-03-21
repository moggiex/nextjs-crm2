-- AlterTable
ALTER TABLE "SystemSetting" ALTER COLUMN "siteName" SET DEFAULT 'My Site',
ALTER COLUMN "siteURL" SET DEFAULT 'http://localhost:3000',
ALTER COLUMN "siteEmailAddress" SET DEFAULT 'email@email.com';

-- CreateTable
CREATE TABLE "PayPalSubscription" (
    "id" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "subscriptionID" TEXT NOT NULL,
    "facilitatorAccessToken" TEXT NOT NULL,
    "paymentSource" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PayPalSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PayPalSubscription_orderID_key" ON "PayPalSubscription"("orderID");

-- CreateIndex
CREATE UNIQUE INDEX "PayPalSubscription_subscriptionID_key" ON "PayPalSubscription"("subscriptionID");

-- AddForeignKey
ALTER TABLE "PayPalSubscription" ADD CONSTRAINT "PayPalSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
