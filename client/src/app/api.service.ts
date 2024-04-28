import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '';

  constructor() {}

  async loginPatient(
    userId: string,
    dob: string,
    password: string
  ): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/auth/` +
        'ROLE_PATIENT' +
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
      }
    );

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', 'ROLE_PATIENT');
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('dob', dob);
  }

  async loginResearcher(userId: string, password: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/auth/` +
        'ROLE_RESEARCHER' +
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
      }
    );

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', 'ROLE_RESEARCHER');
    sessionStorage.setItem('password', password);
  }

  async loginAdmin(userId: string, password: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/auth/` +
        'ROLE_ADMIN' +
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
      }
    );

    await this.checkResponse(response);

    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', 'ROLE_ADMIN');
    sessionStorage.setItem('password', password);
  }

  private async checkResponse(response: Response): Promise<void> {
    if (!response.ok) {
      let errorResponse = await response.json();

      alert(errorResponse);

      throw new Error(errorResponse);
    }
  }
}
