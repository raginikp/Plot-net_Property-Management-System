import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock users for demonstration
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'John Admin',
      email: 'admin@plotnet.com',
      role: 'admin',
      phone: '+1234567890',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date()
    },
    {
      id: 2,
      name: 'Sarah Associate',
      email: 'associate@plotnet.com',
      role: 'associate',
      phone: '+1234567891',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date()
    }
  ];

  constructor() {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Mock login with hardcoded credentials
    const user = this.mockUsers.find(u => 
      u.email === credentials.email && 
      (credentials.password === 'password' || credentials.password === 'admin123')
    );

    if (user) {
      const response: AuthResponse = {
        user: { ...user, lastLogin: new Date() },
        token: 'mock-jwt-token-' + user.id
      };
      
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.currentUserSubject.next(response.user);
      
      return of(response);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
