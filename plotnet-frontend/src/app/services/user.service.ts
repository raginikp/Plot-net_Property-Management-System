import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, CreateUserRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mock data for demonstration
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'John Admin',
      email: 'admin@plotnet.com',
      role: 'admin',
      phone: '+1234567890',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date('2024-09-03')
    },
    {
      id: 2,
      name: 'Sarah Associate',
      email: 'sarah@plotnet.com',
      role: 'associate',
      phone: '+1234567891',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-09-02')
    },
    {
      id: 3,
      name: 'Mike Customer',
      email: 'mike@email.com',
      role: 'customer',
      phone: '+1234567892',
      status: 'active',
      createdAt: new Date('2024-02-01')
    }
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    return of([...this.mockUsers]);
  }

  getUserById(id: number): Observable<User> {
    const user = this.mockUsers.find(u => u.id === id);
    if (user) {
      return of(user);
    }
    throw new Error('User not found');
  }

  createUser(user: CreateUserRequest): Observable<User> {
    const newUser: User = {
      ...user,
      id: Math.max(...this.mockUsers.map(u => u.id)) + 1,
      createdAt: new Date(),
      status: 'active'
    };
    this.mockUsers.push(newUser);
    return of(newUser);
  }

  updateUser(id: number, userUpdate: Partial<User>): Observable<User> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.mockUsers[userIndex] = { ...this.mockUsers[userIndex], ...userUpdate };
      return of(this.mockUsers[userIndex]);
    }
    throw new Error('User not found');
  }

  deleteUser(id: number): Observable<void> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.mockUsers.splice(userIndex, 1);
      return of(void 0);
    }
    throw new Error('User not found');
  }
}
