-- CreateTable
CREATE TABLE "BookingInfo" (
    "id" SERIAL NOT NULL,
    "room_charge" DECIMAL(8,2) NOT NULL,
    "extra_charges" DECIMAL(4,2) NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "booking_slot_id" INTEGER NOT NULL,

    CONSTRAINT "BookingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookingInfo_booking_slot_id_key" ON "BookingInfo"("booking_slot_id");

-- AddForeignKey
ALTER TABLE "BookingInfo" ADD CONSTRAINT "BookingInfo_booking_slot_id_fkey" FOREIGN KEY ("booking_slot_id") REFERENCES "BookingDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

