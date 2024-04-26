import { Controller, UseGuards, Get } from "@nestjs/common";
import { Model, Payment, Role, User } from "@prisma/client";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { ResearcherService } from "./researcher.service";

@Controller("/api/v1/researcher")
@UseGuards(new AuthGuard(Role.ROLE_RESEARCHER))
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get("/model")
  async getModels(@CurrentUser() currentUser: User): Promise<Model[]> {
    return await this.researcherService.getModels(currentUser);
  }

  @Get("/payment")
  async getMPayments(@CurrentUser() currentUser: User): Promise<Payment[]> {
    return await this.researcherService.getPayments(currentUser);
  }
}
