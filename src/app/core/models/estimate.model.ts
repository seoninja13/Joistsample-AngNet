export interface Estimate {
  id: string;
  projectId: string;
  clientId: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: EstimateStatus;
  validUntil: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
  notes?: string;
}

export enum EstimateStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}