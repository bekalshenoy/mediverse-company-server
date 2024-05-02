import { BadRequestException, Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { Hashing } from "./utils/hashing.util";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authenticate(
    userCredentials,
  ): Promise<{ user: User; access_token: string }> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: userCredentials.userId,
      },
    });

    if (user == null) {
      throw new BadRequestException("User Not Found");
    }

    if (!Hashing.verify(userCredentials.password, user.password)) {
      throw new BadRequestException("Not Authorized");
    }

    if (
      userCredentials.dob &&
      user.role == Role.ROLE_PATIENT &&
      !Hashing.verify(userCredentials.dob, user.dob)
    ) {
      throw new BadRequestException("Not Authorized");
    }

    return {
      user: user,
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
