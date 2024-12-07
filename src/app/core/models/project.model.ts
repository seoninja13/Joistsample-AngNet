export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  clientId: string;
  contractorId: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}