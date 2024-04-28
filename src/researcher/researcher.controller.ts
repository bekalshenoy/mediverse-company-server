import { Controller, UseGuards, Get, Req } from "@nestjs/common";
import { Model, Payment, Role } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { ResearcherService } from "./researcher.service";

@Controller("/api/v1/researcher")
@UseGuards(new AuthGuard(Role.ROLE_RESEARCHER))
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get("/model")
  async getModels(@Req() req): Promise<Model[]> {
    return await this.researcherService.getModels(req.user);
  }

  @Get("/payment")
  async getMPayments(@Req() req): Promise<Payment[]> {
    return await this.researcherService.getPayments(req.user);
  }
}
