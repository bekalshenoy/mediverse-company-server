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
        Authorization: this.token(),
      },
    });

    await this.checkResponse(response);

    return await response.json();
  }

  async getPayments(): Promise<Payment[]> {
    const response: Response = await fetch(`${this.baseUrl}/payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token(),
      },
    });

    await this.checkResponse(response);

    return await response.json();
  }

  token(): string {
    return 'Bearer ' + sessionStorage.getItem('token');
  }

  private async checkResponse(response: Response): Promise<void> {
    if (!response.ok) {
      const errorResponse = await response.json();

      alert(errorResponse.message);

      throw new Error(errorResponse);
    }
  }
}
