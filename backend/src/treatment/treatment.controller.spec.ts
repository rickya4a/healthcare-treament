import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';

describe('TreatmentController', () => {
  let controller: TreatmentController;
  let service: TreatmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentController],
      providers: [
        {
          provide: TreatmentService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TreatmentController>(TreatmentController);
    service = module.get<TreatmentService>(TreatmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      // Mock the service method
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(mockTreatmentDto);

      // Assert
      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(mockTreatmentDto);
    });
  });
});