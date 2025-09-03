export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: 'website' | 'referral' | 'advertisement' | 'walk-in';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  interestedProperty: string;
  budget: number;
  assignedTo: number; // Associate ID
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  id: number;
  leadId: number;
  propertyId: number;
  plotId: number;
  customerName: string;
  dealValue: number;
  status: 'negotiation' | 'agreement' | 'payment-pending' | 'completed' | 'cancelled';
  associateId: number;
  commission: number;
  paymentSchedule: PaymentSchedule[];
  documents: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface PaymentSchedule {
  id: number;
  dealId: number;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: Date;
  paymentMethod?: string;
}
