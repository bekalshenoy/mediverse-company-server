import { Injectable } from '@angular/core';
import { Family, MedicalReport, Patient, Report, User } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '/api/v1/patient';

  constructor() {}

  async getPatient(): Promise<Patient> {
    const response: Response = await fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    await this.checkResponse(response);

    let patient: Patient = await response.json();

    // @ts-ignore
    patient.family = patient.family.map((member: Family) => {
      return member.memberId;
    });

    return patient;
  }

  async getHospitals(): Promise<User[]> {
    const response: Response = await fetch(`${this.baseUrl}/hospital`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    await this.checkResponse(response);

    return await response.json();
  }

  async getReports(userId: string): Promise<Report[]> {
    const response: Response = await fetch(
      `${this.baseUrl}/report/hospital/${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    await this.checkResponse(response);

    return await response.json();
  }

  async getMedicalReport(
    entryId: string,
    dob: string,
    password: string
  ): Promise<MedicalReport> {
    const response: Response = await fetch(
      `${this.baseUrl}/report/${entryId}?` +
        new URLSearchParams({
          dob: dob,
          password: password,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    await this.checkResponse(response);

    return await response.json();
  }

  async addFamilyMember(memberId: string): Promise<void> {
    const response: Response = await fetch(`${this.baseUrl}/family`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId: memberId,
      }),
      credentials: 'include',
    });

    await this.checkResponse(response);
  }

  async deleteFamilyMember(memberId: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/family/${memberId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    await this.checkResponse(response);
  }

  private async checkResponse(response: Response): Promise<void> {
    if (!response.ok) {
      let errorResponse = await response.json();

      alert(errorResponse);

      throw new Error(errorResponse);
    }
  }
}
