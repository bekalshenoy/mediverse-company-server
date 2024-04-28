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
import { Model, Payment, Role } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { HospitalService } from "./hospital.service";
import { Patient } from "src/dto/patient.dto";

@Controller("/api/v1/hospital")
@UseGuards(new AuthGuard(Role.ROLE_HOSPITAL))
export class HospitalController {
  patientService: any;
  constructor(private hospitalService: HospitalService) {}

  @Post("/patient")
  async createPatient(@Body() patient: Patient): Promise<void> {
    await this.hospitalService.createPatient(patient);
  }

  @Get("/patient/:id/check")
  async checkPatient(@Param("id") patientId: string): Promise<boolean> {
    return await this.hospitalService.checkPatient(patientId);
  }

  @Get("/patient/:patientId/family/:memberId")
  async checkPatientWithFamily(
    @Param("patientId") patientId: string,
    @Param("memberId") memberId: string,
    @Query("password") password: string,
    @Query("dob") dob: string,
  ): Promise<boolean> {
    return await this.hospitalService.checkPatientWithFamily(
      patientId,
      memberId,
      password,
      dob,
    );
  }

  @Get("/patient/:id/password")
  async checkPassword(
    @Param("id") patientId,
    @Query("password") password,
    @Query("dob") dob,
  ): Promise<boolean> {
    return await this.hospitalService.checkPassword(patientId, password, dob);
  }

  @Get("/model")
  async getModels(@Req() req): Promise<Model[]> {
    return await this.hospitalService.getModels(req.user);
  }

  @Post("/report/:reportId/patient/:patientId")
  async addReport(
    @Param("reportId") reportId: number,
    @Param("patientId") patientId: string,
    @Req() req,
  ): Promise<void> {
    await this.hospitalService.addReport(reportId, patientId, req.user);
  }

  @Delete("/report/:id")
  async deleteReport(@Param("id") reportId: number, @Req() req): Promise<void> {
    await this.hospitalService.deleteReport(reportId, req.user);
  }

  @Get("/payment")
  async getPayments(@Req() req): Promise<Payment[]> {
    return await this.hospitalService.getPayments(req.user);
  }
}
