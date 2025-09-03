export interface Property {
  id: number;
  name: string;
  type: 'residential' | 'commercial' | 'office' | 'industrial';
  location: string;
  totalPlots: number;
  availablePlots: number;
  pricePerSqFt: number;
  amenities: string[];
  status: 'active' | 'sold-out' | 'upcoming';
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Plot {
  id: number;
  propertyId: number;
  plotNumber: string;
  area: number;
  price: number;
  status: 'available' | 'booked' | 'sold';
  facing: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  dimensions: string;
  corner?: boolean;
}
