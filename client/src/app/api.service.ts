import { Injectable } from '@angular/core';

export enum Role {
  ADMIN = 'ROLE_ADMIN',
  RESEARCHER = 'ROLE_RESEARCHER',
  PATIENT = 'ROLE_PATIENT',
  MODEL = 'ROLE_MODEL',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '';

  constructor() {}

  async loginPatient(
    userId: string,
    dob: string,
    password: string,
  ): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/auth/` +
        Role.PATIENT +
        '?' +
        new URLSearchParams({
          userId: userId,
          dob: dob,
          password: password,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', Role.PATIENT);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('dob', dob);
  }

  async loginResearcher(userId: string, password: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/auth/` +
        Role.RESEARCHER +
        '?' +
        new URLSearchParams({
          userId: userId,
          password: password,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', Role.RESEARCHER);
    sessionStorage.setItem('password', password);
  }

  async loginAdmin(userId: string, password: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/auth/` +
        Role.ADMIN +
        '?' +
        new URLSearchParams({
          userId: userId,
          password: password,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', Role.ADMIN);
    sessionStorage.setItem('password', password);
  }

  private async checkResponse(response: Response): Promise<void> {
    if (!response.ok) {
      const errorResponse = await response.json();

      alert(errorResponse);

      throw new Error(errorResponse);
    }
  }
}
