import { Injectable } from '@angular/core';
import { Model, Payment } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '/api/v1/researcher';

  constructor() {}

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

  async getPayments(): Promise<Payment[]> {
    const response: Response = await fetch(`${this.baseUrl}/payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    await this.checkResponse(response);

    return await response.json();
  }

  private async checkResponse(response: Response): Promise<void> {
    if (!response.ok) {
      let errorResponse = await response.json();

      alert(errorResponse);

      throw new Error(errorResponse);
    }
  }
}
