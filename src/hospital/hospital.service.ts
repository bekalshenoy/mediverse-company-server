import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Family, Model, Payment, Role, User } from "@prisma/client";
import { Patient } from "src/dto/patient.dto";
import { PrismaService } from "src/prisma.service";
import { Hashing } from "src/utils/hashing.util";

@Injectable()
export class HospitalService {
  constructor(private prismaService: PrismaService) {}

  async createPatient(patient: Patient): Promise<void> {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: {
        userId: patient.userId,
      },
    });

    if (existingUser !== null) {
      throw new BadRequestException("User Already Exists");
    }

    await this.prismaService.user.create({
      data: {
        userId: patient.userId,
        password: await Hashing.hash(patient.password),
        dob: patient.dob,
        role: Role.ROLE_PATIENT,
        name: patient.name,
      },
    });

    patient.family.forEach(async (family) => {
      family.userId = patient.userId;
      await this.prismaService.family.create({
        data: family,
      });
    });
  }

  async checkPatient(patientId: string): Promise<boolean> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: patientId,
      },
    });

    return user !== null && user.role === Role.ROLE_PATIENT;
  }

  async checkPassword(patientId: string, patientPassword: string, dob: string) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: patientId,
      },
    });

    if (user == null) {
      throw new NotFoundException("Patient Not Found");
    }

    return (
      Hashing.verify(user.password, patientPassword) &&
      Hashing.verify(user.dob, dob)
    );
  }

  async checkPatientWithFamily(
    patientId: string,
    memberId: string,
    memberPassword: string,
    patientDob: string,
  ): Promise<boolean> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: patientId,
      },
    });

    if (user == null || user.role !== Role.ROLE_PATIENT) {
      throw new NotFoundException("Patient Not Found");
    }

    const member: User = await this.prismaService.user.findUnique({
      where: {
        userId: memberId,
      },
    });

    if (member == null || member.role !== Role.ROLE_PATIENT) {
      throw new NotFoundException("Member Account Not Found");
    }

    if (!Hashing.verify(member.password, memberPassword)) {
      throw new NotFoundException("Not Authorized Patient(Guardian)");
    }

    const family: Family = await this.prismaService.family.findFirst({
      where: {
        userId: patientId,
        memberId: memberId,
      },
    });

    if (family == null) {
      throw new NotFoundException("Not Authorized Family Member");
    }

    if (!Hashing.verify(user.dob, patientDob)) {
      throw new NotFoundException("Incorrect Date of Birth");
    }

    return true;
  }

  async getModels(currentUser: User): Promise<Model[]> {
    return await this.prismaService.model.findMany({
      include: {
        _count: {
          select: {
            usage: {
              where: {
                logged_at: {
                  gte: new Date().toISOString(),
                },
                hospitalId: currentUser.userId,
              },
            },
          },
        },
      },
    });
  }

  async addReport(
    reportId: number,
    patientId: string,
    currentUser: User,
  ): Promise<void> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: patientId,
      },
    });

    if (user == null || user.role !== Role.ROLE_PATIENT) {
      throw new BadRequestException("Not Authorized Patient");
    }

    await this.prismaService.report.create({
      data: {
        reportId: Number(reportId),
        hospitalId: currentUser.userId,
        patientId: patientId,
      },
    });
  }

  async deleteReport(reportId: number, currentUser: User): Promise<void> {
    await this.prismaService.report.deleteMany({
      where: {
        reportId: Number(reportId),
        hospitalId: currentUser.userId,
      },
    });
  }

  async getPayments(currentUser: User): Promise<Payment[]> {
    return await this.prismaService.payment.findMany({
      where: {
        userId: currentUser.userId,
      },
    });
  }
}
