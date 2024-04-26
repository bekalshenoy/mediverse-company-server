import { Module } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { HttpModule } from "@nestjs/axios";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [HttpModule],
  providers: [PatientService, PrismaService],
  controllers: [PatientController],
})
export class PatientModule {}
