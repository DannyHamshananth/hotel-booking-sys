-- CreateTable
CREATE TABLE "BookingDay" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER,
    "room_id" INTEGER,
    "user_id" TEXT,

    CONSTRAINT "BookingDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingDay" ADD CONSTRAINT "BookingDay_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDay" ADD CONSTRAINT "BookingDay_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

