import { Module } from '@nestjs/common';
import { TreatmentModule } from './treatment/treatment.module';

@Module({
  imports: [TreatmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}