import { BadRequestException, Injectable } from "@nestjs/common";
import { Model, Role, User } from "@prisma/client";
import { Hospital } from "src/dto/hospital.dto";
import { Researcher } from "src/dto/researcher.dto";
import { PrismaService } from "src/prisma.service";
import { Hashing } from "src/utils/hashing.util";

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async getHospitals(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: {
        role: Role.ROLE_HOSPITAL,
      },
    });
  }

  async getResearchers(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: {
        role: Role.ROLE_RESEARCHER,
      },
    });
  }

  async getModels(): Promise<Model[]> {
    return await this.prismaService.model.findMany();
  }

  async addHospital(hospital: Hospital): Promise<void> {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: {
        userId: hospital.userId,
      },
    });

    if (existingUser !== null) {
      throw new BadRequestException("User Already Exists");
    }

    await this.prismaService.user.create({
      data: {
        ...hospital,
        password: await Hashing.hash(hospital.password),
        role: Role.ROLE_HOSPITAL,
      },
    });
  }

  async addResearcher(researcher: Researcher): Promise<void> {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: {
        userId: researcher.userId,
      },
    });

    if (existingUser !== null) {
      throw new BadRequestException("User Already Exists");
    }

    await this.prismaService.user.create({
      data: {
        ...researcher,
        password: await Hashing.hash(researcher.password),
        role: Role.ROLE_RESEARCHER,
      },
    });
  }

  async addModel(model: Model, password: string): Promise<void> {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: {
        userId: model.name,
      },
    });

    if (existingUser !== null) {
      throw new BadRequestException("User Already Exists");
    }

    const researcher: User = await this.prismaService.user.findUnique({
      where: {
        userId: model.researcherId,
      },
    });

    if (researcher == null || researcher.role !== Role.ROLE_RESEARCHER) {
      throw new BadRequestException("Researcher Id is invalid");
    }

    await this.prismaService.user.create({
      data: {
        userId: model.name,
        name: model.name,
        password: await Hashing.hash(password),
        role: Role.ROLE_MODEL,
      },
    });

    await this.prismaService.model.create({
      data: {
        name: model.name,
        description: model.description,
        researcherId: model.researcherId,
        cost: model.cost,
        server: model.server,
      },
    });
  }

  async removeUser(userId: string): Promise<void> {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingUser == null) {
      throw new BadRequestException("User Id is invalid");
    }

    await this.prismaService.user.delete({
      where: {
        userId: userId,
      },
    });
  }

  async deleteModel(modelId: number): Promise<void> {
    modelId = Number(modelId);
    const existingModel: Model = await this.prismaService.model.findUnique({
      where: {
        modelId: modelId,
      },
    });

    if (existingModel == null) {
      throw new BadRequestException("Model Id is invalid");
    }

    await this.prismaService.user.delete({
      where: {
        userId: existingModel.name,
      },
    });

    await this.prismaService.model.delete({
      where: {
        modelId: modelId,
      },
    });
  }
}
