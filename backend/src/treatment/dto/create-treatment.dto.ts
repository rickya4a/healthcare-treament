import { IsString, IsNumber, IsArray, IsDateString, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTreatmentDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfTreatment: string;

  @IsArray()
  @IsString({ each: true })
  treatmentDescription: string[];

  @IsArray()
  @IsString({ each: true })
  medicationsPrescribed: string[];

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  costOfTreatment: number;
}