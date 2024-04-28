import { Injectable } from '@angular/core';
import { Hospital, Model, Researcher, User } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '/api/v1/admin';

  constructor() {}

  async addHospital(hospital: Hospital): Promise<void> {
    const response: Response = await fetch(`${this.baseUrl}/hospital`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospital),
      credentials: 'include',
    });

    await this.checkResponse(response);
  }

  async addResearcher(researcher: Researcher): Promise<void> {
    const response: Response = await fetch(`${this.baseUrl}/researcher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(researcher),
      credentials: 'include',
    });

    await this.checkResponse(response);
  }

  async addModel(model: Model, password: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/model?` +
        new URLSearchParams({
          password: password,
        }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
        credentials: 'include',
      }
    );

    await this.checkResponse(response);
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

  async getResearchers(): Promise<User[]> {
    const response: Response = await fetch(`${this.baseUrl}/researcher`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    await this.checkResponse(response);

    return await response.json();
  }

  async getModels(): Promise<Model[]> {
    const response: Response = await fetch(`${this.baseUrl}/model`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    await this.checkResponse(response);

    return await response.json();
  }

  async removeUser(userId: string): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/user/${encodeURIComponent(userId)}`,
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

  async deleteModel(modelId: number): Promise<void> {
    const response: Response = await fetch(
      `${this.baseUrl}/model/${encodeURIComponent(modelId)}`,
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
