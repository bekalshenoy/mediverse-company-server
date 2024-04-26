import { BadRequestException, Injectable } from "@nestjs/common";
import { Model, Role, Usage, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { Hashing } from "src/utils/hashing.util";

@Injectable()
export class ModelService {
  constructor(private prismaService: PrismaService) {}

  async addUsage(
    usage: Usage,
    hospitalPassword: string,
    currentUser: User,
  ): Promise<void> {
    const model: Model = await this.prismaService.model.findUnique({
      where: { modelId: usage.modelId },
    });

    if (model == null || model.name != currentUser.userId) {
      throw new BadRequestException(
        "You are not authorized to add usage for this model",
      );
    }

    const user: User = await this.prismaService.user.findUnique({
      where: { userId: usage.hospitalId },
    });

    if (
      user == null ||
      user.role != Role.ROLE_HOSPITAL ||
      Hashing.verify(user.password, hospitalPassword)
    ) {
      throw new BadRequestException("Hospital Not Found");
    }

    await this.prismaService.usage.create({
      data: usage,
    });
  }
}
