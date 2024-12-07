export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  notes?: string;
  projectIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientStats {
  totalProjects: number;
  activeProjects: number;
  totalSpent: number;
  averageProjectValue: number;
}