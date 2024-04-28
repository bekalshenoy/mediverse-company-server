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
    const response: Response = await fetch(`${this.baseUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        dob: dob,
        password: password,
      }),
    });

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', Role.PATIENT);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('dob', dob);
    sessionStorage.setItem('token', (await response.json()).access_token);
  }

  async loginResearcher(userId: string, password: string): Promise<void> {
    const response: Response = await fetch(`${this.baseUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        password: password,
      }),
    });

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', Role.RESEARCHER);
    sessionStorage.setItem('token', (await response.json()).access_token);
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
    sessionStorage.setItem('token', (await response.json()).access_token);
  }

  private async checkResponse(response: Response): Promise<void> {
    if (!response.ok) {
      const errorResponse = await response.json();

      alert(errorResponse);

      throw new Error(errorResponse);
    }
  }
}
