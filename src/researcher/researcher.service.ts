import { Injectable } from "@nestjs/common";
import { Model, Payment, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ResearcherService {
  constructor(private prismaService: PrismaService) {}

  async getModels(currentUser: User): Promise<Model[]> {
    return await this.prismaService.model.findMany({
      where: {
        researcherId: currentUser.userId,
      },
      include: {
        _count: {
          select: {
            usage: {
              where: {
                logged_at: {
                  gte: new Date().toISOString(),
                },
              },
            },
          },
        },
      },
    });
  }

  async getPayments(currentUser: User): Promise<Payment[]> {
    return await this.prismaService.payment.findMany({
      where: { userId: currentUser.userId },
    });
  }
}
