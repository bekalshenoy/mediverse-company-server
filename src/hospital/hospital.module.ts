import { Module } from "@nestjs/common";
import { HospitalService } from "./hospital.service";
import { HospitalController } from "./hospital.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [HospitalService, PrismaService],
  controllers: [HospitalController],
})
export class HospitalModule {}
