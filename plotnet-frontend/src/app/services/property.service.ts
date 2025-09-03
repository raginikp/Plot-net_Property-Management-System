import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property, Plot } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Mock data for demonstration
  private mockProperties: Property[] = [
    {
      id: 1,
      name: 'Green Valley Residency',
      type: 'residential',
      location: 'Sector 45, Gurgaon',
      totalPlots: 150,
      availablePlots: 45,
      pricePerSqFt: 5500,
      amenities: ['Swimming Pool', 'Gym', 'Park', 'Security', 'Power Backup'],
      status: 'active',
      description: 'Premium residential plots with modern amenities',
      images: ['image1.jpg', 'image2.jpg'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-08-15')
    },
    {
      id: 2,
      name: 'Tech Park Commercial',
      type: 'commercial',
      location: 'Cyber City, Hyderabad',
      totalPlots: 80,
      availablePlots: 12,
      pricePerSqFt: 8500,
      amenities: ['24/7 Security', 'Parking', 'Food Court', 'Conference Rooms'],
      status: 'active',
      description: 'Commercial spaces in prime IT hub location',
      images: ['comm1.jpg', 'comm2.jpg'],
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-08-20')
    },
    {
      id: 3,
      name: 'Corporate Office Complex',
      type: 'office',
      location: 'Business District, Pune',
      totalPlots: 60,
      availablePlots: 8,
      pricePerSqFt: 7200,
      amenities: ['High Speed Internet', 'Cafeteria', 'Meeting Rooms', 'Parking'],
      status: 'active',
      description: 'Modern office spaces with state-of-the-art facilities',
      images: ['office1.jpg', 'office2.jpg'],
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-08-25')
    }
  ];

  private mockPlots: Plot[] = [
    { id: 1, propertyId: 1, plotNumber: 'A-101', area: 1200, price: 6600000, status: 'available', facing: 'north', dimensions: '30x40', corner: true },
    { id: 2, propertyId: 1, plotNumber: 'A-102', area: 1000, price: 5500000, status: 'booked', facing: 'east', dimensions: '25x40' },
    { id: 3, propertyId: 2, plotNumber: 'B-201', area: 800, price: 6800000, status: 'available', facing: 'south', dimensions: '20x40' },
    { id: 4, propertyId: 3, plotNumber: 'C-301', area: 1500, price: 10800000, status: 'sold', facing: 'west', dimensions: '30x50', corner: true }
  ];

  constructor() {}

  getProperties(): Observable<Property[]> {
    return of([...this.mockProperties]);
  }

  getPropertyById(id: number): Observable<Property> {
    const property = this.mockProperties.find(p => p.id === id);
    if (property) {
      return of(property);
    }
    throw new Error('Property not found');
  }

  getPlotsByProperty(propertyId: number): Observable<Plot[]> {
    const plots = this.mockPlots.filter(p => p.propertyId === propertyId);
    return of(plots);
  }

  createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Observable<Property> {
    const newProperty: Property = {
      ...property,
      id: Math.max(...this.mockProperties.map(p => p.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockProperties.push(newProperty);
    return of(newProperty);
  }

  updateProperty(id: number, propertyUpdate: Partial<Property>): Observable<Property> {
    const propertyIndex = this.mockProperties.findIndex(p => p.id === id);
    if (propertyIndex !== -1) {
      this.mockProperties[propertyIndex] = { 
        ...this.mockProperties[propertyIndex], 
        ...propertyUpdate,
        updatedAt: new Date()
      };
      return of(this.mockProperties[propertyIndex]);
    }
    throw new Error('Property not found');
  }
}
