import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { Family, Report, Role } from "@prisma/client";
import { MedicalReport } from "src/dto/medical-report.dto";
import { Hospital } from "src/dto/hospital.dto";
import { Patient } from "src/dto/patient.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("/api/v1/patient")
@UseGuards(new AuthGuard(Role.ROLE_PATIENT))
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get("/")
  async getPatient(@Req() req): Promise<Patient> {
    return await this.patientService.getPatient(req.user.userId);
  }

  @Get("/hospital")
  async getHospitals(@Req() req): Promise<Hospital[]> {
    return await this.patientService.getHospitals(req.user);
  }

  @Get("/report/hospital/:id")
  async getReports(@Param("id") hospitalId: string): Promise<Report[]> {
    return await this.patientService.getReports(hospitalId);
  }

  @Get("/report/:id")
  async getReport(
    @Param("id") entryId: number,
    @Query("dob") dob: string,
    @Query("password") password: string,
    @Req() req,
  ): Promise<MedicalReport> {
    return await this.patientService.getReport(
      entryId,
      password,
      dob,
      req.user,
    );
  }

  @Post("/family")
  async addFamily(@Body() family: Family, @Req() req): Promise<void> {
    await this.patientService.addFamily(family, req.user);
  }

  @Delete("/family/:id")
  async deleteFamily(@Param("id") memberId: string, @Req() req): Promise<void> {
    await this.patientService.deleteFamily(memberId, req.user);
  }
}
