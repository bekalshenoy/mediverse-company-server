import {
  Body,
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Param,
  Delete,
} from "@nestjs/common";
import { Model, Role, User } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminService } from "./admin.service";
import { Hospital } from "src/dto/hospital.dto";
import { Researcher } from "src/dto/researcher.dto";

@Controller("/api/v1/admin")
@UseGuards(new AuthGuard(Role.ROLE_ADMIN))
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("/hospital")
  async getHospitals() {
    return this.adminService.getHospitals();
  }

  @Get("/researcher")
  async getResearchers(): Promise<User[]> {
    return await this.adminService.getResearchers();
  }

  @Post("/hospital")
  async addHospital(@Body() hospital: Hospital): Promise<void> {
    await this.adminService.addHospital(hospital);
  }

  @Post("/researcher")
  async addResearcher(@Body() researcher: Researcher): Promise<void> {
    await this.adminService.addResearcher(researcher);
  }

  @Delete("/user/:id")
  async removeUser(@Param("id") userId: string): Promise<void> {
    await this.adminService.removeUser(userId);
  }

  @Get("/model")
  async getModels(): Promise<Model[]> {
    return await this.adminService.getModels();
  }

  @Post("/model")
  async addModel(
    @Body() model: Model,
    @Query("password") password: string,
  ): Promise<void> {
    await this.adminService.addModel(model, password);
  }

  @Delete("/model/:id")
  async deleteModel(@Param("id") modelId: number): Promise<void> {
    await this.adminService.deleteModel(modelId);
  }
}
