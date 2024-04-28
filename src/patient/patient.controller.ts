import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { Family, Report, Role, User } from "@prisma/client";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { MedicalReport } from "src/dto/medical-report.dto";
import { Hospital } from "src/dto/hospital.dto";
import { Patient } from "src/dto/patient.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("/api/v1/patient")
@UseGuards(new AuthGuard(Role.ROLE_PATIENT))
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get("/")
  async getPatient(@Session() session: any): Promise<Patient> {
    return await this.patientService.getPatient(session.userId);
  }

  @Get("/hospital")
  async getHospitals(@CurrentUser() currentUser: User): Promise<Hospital[]> {
    return await this.patientService.getHospitals(currentUser);
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
    @CurrentUser() currentUser: User,
  ): Promise<MedicalReport> {
    return await this.patientService.getReport(
      entryId,
      password,
      dob,
      currentUser,
    );
  }

  @Post("/family")
  async addFamily(
    @Body() family: Family,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.patientService.addFamily(family, currentUser);
  }

  @Delete("/family/:id")
  async deleteFamily(
    @Param("id") memberId: string,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.patientService.deleteFamily(memberId, currentUser);
  }
}
