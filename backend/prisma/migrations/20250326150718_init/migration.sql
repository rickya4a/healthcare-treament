-- CreateTable
CREATE TABLE "TreatmentRecord" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateOfTreatment" TIMESTAMP(3) NOT NULL,
    "treatmentDescription" TEXT[],
    "medicationsPrescribed" TEXT[],
    "costOfTreatment" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreatmentRecord_pkey" PRIMARY KEY ("id")
);
