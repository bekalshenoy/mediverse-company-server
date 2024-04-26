import { Body, Controller, Post, Query } from "@nestjs/common";
import { ModelService } from "./model.service";
import { Usage, User } from "@prisma/client";
import { CurrentUser } from "src/decorators/current-user.decorator";

@Controller("/api/v1/model")
export class ModelController {
  constructor(private modelService: ModelService) {}

  @Post("/usage")
  async addUsage(
    @Body() usage: Usage,
    @Query("password") password: string,
    @CurrentUser() currentUser: User,
  ) {
    await this.modelService.addUsage(usage, password, currentUser);
  }
}
