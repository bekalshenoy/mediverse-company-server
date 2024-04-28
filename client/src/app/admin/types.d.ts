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

export interface Hospital {
  userId: string;
  name: string;
  phone: `${number}`;
  location: string;
  password: string;
  server: string;
}

export interface Researcher {
  userId: string;
  name: string;
  phone: `${number}`;
  location: string;
  password: string;
}

export interface Model {
  usage: number;
  modelId: number;
  name: string;
  description: string;
  researcherId: string;
  cost: number;
  server: string;
}
