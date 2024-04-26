import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
} from "@nestjs/common";
import { Family, Report, Role, User } from "@prisma/client";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { MedicalReport } from "src/dto/medical-report.dto";
import { Patient } from "src/dto/patient.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PatientService {
  constructor(
    private prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getPatient(patientId: string): Promise<Patient> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: patientId,
      },
    });

    if (user == null) {
      throw new BadRequestException("Patient Not Found");
    }

    const family: Family[] = await this.prismaService.family.findMany({
      where: {
        userId: patientId,
      },
    });

    return new Patient(
      user.userId,
      user.name,
      user.phone,
      user.location,
      "",
      "",
      family,
    );
  }

  async getHospitals(currentUser: User): Promise<User[]> {
    const hospitals: { hospitalId: string }[] =
      await this.prismaService.report.findMany({
        where: {
          patientId: currentUser.userId,
        },
        distinct: ["hospitalId"],
        select: {
          hospitalId: true,
        },
      });

    return await this.prismaService.user.findMany({
      where: {
        userId: {
          in: hospitals.map((hospital) => hospital.hospitalId),
        },
        role: Role.ROLE_HOSPITAL,
      },
    });
  }

  async getReports(hospitalId: string): Promise<Report[]> {
    return await this.prismaService.report.findMany({
      where: {
        hospitalId: hospitalId,
      },
    });
  }

  async getReport(
    entryId: number,
    patientPassword: string,
    dob: string,
    currentUser: User,
  ): Promise<MedicalReport> {
    const report: Report = await this.prismaService.report.findUnique({
      where: {
        entryId: entryId,
      },
    });

    if (report == null) {
      throw new NotFoundException("Report Not Found");
    }

    if (currentUser.userId !== report.patientId) {
      throw new BadRequestException("Not Authorized");
    }

    const user: User = await this.prismaService.user.findUnique({
      where: {
        userId: report.hospitalId,
      },
    });

    if (user == null || user.role !== Role.ROLE_HOSPITAL) {
      throw new BadRequestException("Hospital Not Found");
    }

    try {
      return (
        await this.httpService.axiosRef.get(
          user.server +
            "/patient/report/" +
            report.reportId +
            "?patientId=" +
            report.patientId +
            "&dob=" +
            dob +
            "&password=" +
            patientPassword,
        )
      ).data;
    } catch (e) {
      throw new InternalServerErrorException("Error Finding Report");
    }
  }

  async addFamily(family: Family, currentUser: User): Promise<void> {
    family.userId = currentUser.userId;

    await this.prismaService.family.create({ data: family });
  }

  async deleteFamily(memberId: string, @CurrentUser() currentUser: User) {
    const family: Family[] = await this.prismaService.family.findMany({
      where: {
        userId: currentUser.userId,
      },
    });

    if (family.length < 2) {
      throw new MethodNotAllowedException(
        "Cannot delete the last family member",
      );
    }

    await this.prismaService.family.deleteMany({
      where: {
        memberId: memberId,
        userId: currentUser.userId,
      },
    });
  }
}
