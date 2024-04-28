export interface Model {
  usage: number;
  modelId: number | null;
  name: string;
  description: string;
  researcherId: string;
  cost: number;
  server: string;
}

export interface Payment {
  paymentId: number;
  userId: number;
  modelId: string;
  amount: number;
  startDate: string;
  endDate: string;
}
