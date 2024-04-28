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
  entryId: string;
  reportId: string;
  patientId: string;
  hospitalId: string;
}

export interface MedicalReport {
  reportId: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  modifiedAt: string;
  section: Section[];
}

export interface Section {
  sectionId: string;
  reportId: string;
  question: string;
  answer: string;
  position: number;
}
