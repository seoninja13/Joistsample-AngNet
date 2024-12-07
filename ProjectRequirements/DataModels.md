# Data Models and Relationships

## User Model
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

enum UserRole {
  ADMIN = 'ADMIN',
  CONTRACTOR = 'CONTRACTOR',
  SUBCONTRACTOR = 'SUBCONTRACTOR',
  CLIENT = 'CLIENT'
}
```

## Client Model
```typescript
interface Client {
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
```

## Project Model
```typescript
interface Project {
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

enum ProjectStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
```

## Estimate Model
```typescript
interface Estimate {
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

enum EstimateStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}
```

## Invoice Model
```typescript
interface Invoice {
  id: string;
  number: string;
  projectId: string;
  clientId: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate: Date;
  notes?: string;
  isRecurring: boolean;
  recurringInterval?: RecurringInterval;
  createdAt: Date;
  updatedAt: Date;
}

enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  PARTIALLY_PAID = 'PARTIALLY_PAID'
}

enum RecurringInterval {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY'
}
```

## Payment Model
```typescript
interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: Date;
}

enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH'
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}
```

## Line Item Model
```typescript
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
  notes?: string;
}
```