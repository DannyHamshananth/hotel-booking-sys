-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "title_1" TEXT NOT NULL,
    "title_2" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "persons" INTEGER NOT NULL,
    "amount" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

