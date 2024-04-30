export interface User {
  userId: string;
  name: string;
  phone: `${number}`;
  location: string;
  dob: string;
  role: Role;
  server: string;
}

export enum Role {
  ADMIN = 'ROLE_ADMIN',
  RESEARCHER = 'ROLE_RESEARCHER',
  PATIENT = 'ROLE_PATIENT',
  MODEL = 'ROLE_MODEL',
}

export interface Patient {
  userId: string | null;
  name: string;
  phone: `${number}`;
  location: string;
  password: string;
  family: Family[] | string[];
}

export interface Family {
  userId: string;
  memberId: string;
}

export interface Report {
  entryId: number;
  reportId: number;
  patientId: string;
  hospitalId: string;
}

export interface MedicalReport {
  reportId: number;
  patientId: string;
  doctorId: string;
  createdAt: string;
  modifiedAt: string;
  section: Section[];
}

export interface Section {
  sectionId: string;
  reportId: number;
  question: string;
  answer: string;
}
