export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'associate' | 'customer';
  phone: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'associate' | 'customer';
  phone: string;
  password: string;
}
