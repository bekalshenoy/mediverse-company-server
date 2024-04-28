export interface Model {
  _count: {
    usage: number;
  };
  modelId: number | null;
  name: string;
  description: string;
  researcherId: string;
  cost: number;
  server: string;
}

export interface Payment {
  paymentId: number;
  userId: string;
  modelId: number;
  amount: number;
  startDate: string;
  endDate: string;
}
