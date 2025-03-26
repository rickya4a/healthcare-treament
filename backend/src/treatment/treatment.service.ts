import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';

@Injectable()
export class TreatmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    try {
      return this.prisma.treatmentRecord.create({
        data: {
          patientName: createTreatmentDto.patientName,
          patientId: createTreatmentDto.patientId,
          dateOfTreatment: new Date(createTreatmentDto.dateOfTreatment),
          treatmentDescription: createTreatmentDto.treatmentDescription,
          medicationsPrescribed: createTreatmentDto.medicationsPrescribed,
          costOfTreatment: createTreatmentDto.costOfTreatment,
      },
    });
    } catch (error) {
      throw new Error('Failed to create treatment record');
    }
  }
}