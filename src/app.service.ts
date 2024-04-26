import { BadRequestException, Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { Hashing } from "./utils/hashing.util";

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async authenticate(
    userId: string,
    password: string,
    dob: string,
  ): Promise<void> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (user == null) {
      throw new BadRequestException("Patient Not Found");
    }

    if (!Hashing.verify(password, user.password)) {
      throw new BadRequestException("Not Authorized");
    }

    if (
      dob != null &&
      user.role == Role.ROLE_PATIENT &&
      !Hashing.verify(dob, user.dob)
    ) {
      throw new BadRequestException("Not Authorized");
    }
  }
}
