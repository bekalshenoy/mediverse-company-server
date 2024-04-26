import { Module } from "@nestjs/common";
import { ModelService } from "./model.service";
import { ModelController } from "./model.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [ModelService, PrismaService],
  controllers: [ModelController],
})
export class ModelModule {}
