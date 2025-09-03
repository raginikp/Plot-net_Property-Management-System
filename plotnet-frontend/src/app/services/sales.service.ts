import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lead, Deal, PaymentSchedule } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  // Mock data for demonstration
  private mockLeads: Lead[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1234567890',
      source: 'website',
      status: 'qualified',
      interestedProperty: 'Green Valley Residency',
      budget: 6000000,
      assignedTo: 2,
      notes: 'Interested in corner plot with north facing',
      createdAt: new Date('2024-08-15'),
      updatedAt: new Date('2024-09-01')
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.j@email.com',
      phone: '+1234567891',
      source: 'referral',
      status: 'new',
      interestedProperty: 'Tech Park Commercial',
      budget: 8000000,
      assignedTo: 2,
      notes: 'Looking for commercial space for IT company',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01')
    }
  ];

  private mockDeals: Deal[] = [
    {
      id: 1,
      leadId: 1,
      propertyId: 1,
      plotId: 1,
      customerName: 'John Smith',
      dealValue: 6600000,
      status: 'agreement',
      associateId: 2,
      commission: 132000,
      paymentSchedule: [],
      documents: ['agreement.pdf', 'payment_plan.pdf'],
      createdAt: new Date('2024-09-01')
    }
  ];

  constructor() {}

  getLeads(): Observable<Lead[]> {
    return of([...this.mockLeads]);
  }

  getLeadsByAssociate(associateId: number): Observable<Lead[]> {
    const leads = this.mockLeads.filter(lead => lead.assignedTo === associateId);
    return of(leads);
  }

  createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Observable<Lead> {
    const newLead: Lead = {
      ...lead,
      id: Math.max(...this.mockLeads.map(l => l.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockLeads.push(newLead);
    return of(newLead);
  }

  updateLead(id: number, leadUpdate: Partial<Lead>): Observable<Lead> {
    const leadIndex = this.mockLeads.findIndex(l => l.id === id);
    if (leadIndex !== -1) {
      this.mockLeads[leadIndex] = { 
        ...this.mockLeads[leadIndex], 
        ...leadUpdate,
        updatedAt: new Date()
      };
      return of(this.mockLeads[leadIndex]);
    }
    throw new Error('Lead not found');
  }

  getDeals(): Observable<Deal[]> {
    return of([...this.mockDeals]);
  }

  getDealsByAssociate(associateId: number): Observable<Deal[]> {
    const deals = this.mockDeals.filter(deal => deal.associateId === associateId);
    return of(deals);
  }

  createDeal(deal: Omit<Deal, 'id' | 'createdAt'>): Observable<Deal> {
    const newDeal: Deal = {
      ...deal,
      id: Math.max(...this.mockDeals.map(d => d.id)) + 1,
      createdAt: new Date()
    };
    this.mockDeals.push(newDeal);
    return of(newDeal);
  }

  updateDeal(id: number, dealUpdate: Partial<Deal>): Observable<Deal> {
    const dealIndex = this.mockDeals.findIndex(d => d.id === id);
    if (dealIndex !== -1) {
      this.mockDeals[dealIndex] = { ...this.mockDeals[dealIndex], ...dealUpdate };
      return of(this.mockDeals[dealIndex]);
    }
    throw new Error('Deal not found');
  }
}
