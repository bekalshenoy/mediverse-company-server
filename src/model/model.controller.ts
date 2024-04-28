import { Body, Controller, Post, Query, Req } from "@nestjs/common";
import { ModelService } from "./model.service";
import { Usage } from "@prisma/client";

@Controller("/api/v1/model")
export class ModelController {
  constructor(private modelService: ModelService) {}

  @Post("/usage")
  async addUsage(
    @Body() usage: Usage,
    @Query("password") password: string,
    @Req() req,
  ) {
    await this.modelService.addUsage(usage, password, req.user);
  }
}
