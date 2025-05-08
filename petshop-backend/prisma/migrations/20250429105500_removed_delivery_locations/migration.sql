/*
  Warnings:

  - You are about to drop the `DeliveryLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductDeliveryLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductDeliveryLocation` DROP FOREIGN KEY `ProductDeliveryLocation_deliveryLocationId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductDeliveryLocation` DROP FOREIGN KEY `ProductDeliveryLocation_productId_fkey`;

-- DropTable
DROP TABLE `DeliveryLocation`;

-- DropTable
DROP TABLE `ProductDeliveryLocation`;
