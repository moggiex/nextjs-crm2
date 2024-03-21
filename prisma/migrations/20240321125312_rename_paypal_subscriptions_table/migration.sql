/*
  Warnings:

  - You are about to drop the `PayPalSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PayPalSubscription" DROP CONSTRAINT "PayPalSubscription_userId_fkey";

-- DropTable
DROP TABLE "PayPalSubscription";

-- CreateTable
CREATE TABLE "PayPalSubscriptionEvent" (
    "id" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "subscriptionID" TEXT NOT NULL,
    "facilitatorAccessToken" TEXT NOT NULL,
    "paymentSource" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PayPalSubscriptionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PayPalSubscriptionEvent_orderID_key" ON "PayPalSubscriptionEvent"("orderID");

-- CreateIndex
CREATE UNIQUE INDEX "PayPalSubscriptionEvent_subscriptionID_key" ON "PayPalSubscriptionEvent"("subscriptionID");

-- AddForeignKey
ALTER TABLE "PayPalSubscriptionEvent" ADD CONSTRAINT "PayPalSubscriptionEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
