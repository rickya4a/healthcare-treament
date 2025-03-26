import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('TreatmentController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  // Create a mock implementation of the Prisma service
  const mockPrismaService = {
    treatmentRecord: {
      create: jest.fn(),
    },
    $on: jest.fn(),
    $connect: jest.fn(),
    enableShutdownHooks: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    // Set up global ValidationPipe similar to main.ts
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    // Set up CORS
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/treatment (POST) - should create a treatment record', async () => {
    // Mock data
    const treatmentData = {
      patientName: 'John Doe',
      patientId: 'P12345',
      dateOfTreatment: '2023-06-15T10:30:00.000Z',
      treatmentDescription: ['Physical Therapy', 'Massage'],
      medicationsPrescribed: ['Ibuprofen', 'Acetaminophen'],
      costOfTreatment: 150.50,
    };

    // Mock response
    const mockResponse = {
      id: 1,
      ...treatmentData,
      dateOfTreatment: new Date(treatmentData.dateOfTreatment),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Setup mock
    mockPrismaService.treatmentRecord.create.mockResolvedValue(mockResponse);

    // Make the request
    return request(app.getHttpServer())
      .post('/treatment')
      .send(treatmentData)
      .expect(201)
      .expect((res) => {
        // Check that the response contains the expected data
        expect(res.body).toHaveProperty('id');
        expect(res.body.patientName).toBe(treatmentData.patientName);
        expect(res.body.patientId).toBe(treatmentData.patientId);
        expect(mockPrismaService.treatmentRecord.create).toHaveBeenCalledWith({
          data: {
            patientName: treatmentData.patientName,
            patientId: treatmentData.patientId,
            dateOfTreatment: expect.any(Date),
            treatmentDescription: treatmentData.treatmentDescription,
            medicationsPrescribed: treatmentData.medicationsPrescribed,
            costOfTreatment: treatmentData.costOfTreatment,
          },
        });
      });
  });

  it('/treatment (POST) - should validate input data', async () => {
    // Invalid data missing required fields
    const invalidData = {
      patientName: 'John Doe',
      // missing other required fields
    };

    // Make the request
    return request(app.getHttpServer())
      .post('/treatment')
      .send(invalidData)
      .expect(400)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBeInstanceOf(Array);
        // Should have validation errors
        expect(res.body.message.length).toBeGreaterThan(0);
      });
  });
});