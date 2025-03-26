import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentService } from './treatment.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';

describe('TreatmentService', () => {
  let service: TreatmentService;
  let prismaService: PrismaService;

  // Create a simple mock instead of using jest-mock-extended
  const mockPrismaService = {
    treatmentRecord: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreatmentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TreatmentService>(TreatmentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a treatment record', async () => {
      // Arrange
      const mockTreatmentDto: CreateTreatmentDto = {
        patientName: 'John Doe',
        patientId: 'P12345',
        dateOfTreatment: '2023-06-15T10:30:00.000Z',
        treatmentDescription: ['Physical Therapy', 'Massage'],
        medicationsPrescribed: ['Ibuprofen', 'Acetaminophen'],
        costOfTreatment: 150.50,
      };

      const expectedResult = {
        id: 1,
        patientName: 'John Doe',
        patientId: 'P12345',
        dateOfTreatment: new Date('2023-06-15T10:30:00.000Z'),
        treatmentDescription: ['Physical Therapy', 'Massage'],
        medicationsPrescribed: ['Ibuprofen', 'Acetaminophen'],
        costOfTreatment: 150.50,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the Prisma service create method
      mockPrismaService.treatmentRecord.create.mockResolvedValue(expectedResult);

      // Act
      const result = await service.create(mockTreatmentDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.treatmentRecord.create).toHaveBeenCalledWith({
        data: {
          patientName: mockTreatmentDto.patientName,
          patientId: mockTreatmentDto.patientId,
          dateOfTreatment: new Date(mockTreatmentDto.dateOfTreatment),
          treatmentDescription: mockTreatmentDto.treatmentDescription,
          medicationsPrescribed: mockTreatmentDto.medicationsPrescribed,
          costOfTreatment: mockTreatmentDto.costOfTreatment,
        },
      });
    });

    it('should handle errors when creating a treatment record', async () => {
      // Arrange
      const mockTreatmentDto: CreateTreatmentDto = {
        patientName: 'John Doe',
        patientId: 'P12345',
        dateOfTreatment: '2023-06-15T10:30:00.000Z',
        treatmentDescription: ['Physical Therapy'],
        medicationsPrescribed: ['Ibuprofen'],
        costOfTreatment: 150.50,
      };

      const mockError = new Error('Database error');
      mockPrismaService.treatmentRecord.create.mockRejectedValue(mockError);

      // Act & Assert
      await expect(service.create(mockTreatmentDto)).rejects.toThrow(mockError);
      expect(mockPrismaService.treatmentRecord.create).toHaveBeenCalled();
    });
  });
});