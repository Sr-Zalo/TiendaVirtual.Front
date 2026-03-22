import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { AuthResponse, CurrentUser, LoginRequest, RegisterRequest } from '../models/auth.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    currentUser = signal<CurrentUser | null>(this.loadUser());

    constructor(private api: ApiService) { }

    login(dto: LoginRequest) {
        return this.api.post<AuthResponse>('auth/login', dto).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify({
                    name: response.name,
                    email: response.email,
                    role: response.role
                }));
                this.currentUser.set({
                    name: response.name,
                    email: response.email,
                    role: response.role
                });
            })
        );
    }

    register(dto: RegisterRequest) {
        return this.api.post<void>('auth/register', dto);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    isAdmin(): boolean {
        return this.currentUser()?.role === 'Admin';
    }

    private loadUser(): CurrentUser | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}