import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Section } from "./section.dto";

export class MedicalReport {
  reportId: number;
  @IsNotEmpty()
  @Length(12, 12)
  patientId: string;
  @IsNotEmpty()
  @IsEmail()
  doctorId: string;
  iv: Buffer;
  @IsNotEmpty()
  createdAt: Date;
  @IsNotEmpty()
  modifiedAt: Date;
  @IsNotEmpty()
  section: Section[];
}
