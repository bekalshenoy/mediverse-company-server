import { Module } from "@nestjs/common";
import { ResearcherService } from "./researcher.service";
import { ResearcherController } from "./researcher.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [ResearcherService, PrismaService],
  controllers: [ResearcherController],
})
export class ResearcherModule {}
