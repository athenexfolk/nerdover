import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Token } from '../../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus: BehaviorSubject<boolean>;

  get isLoggedIn() {
    return this.loginStatus.value;
  }

  get isLoggedIn$() {
    return this.loginStatus.asObservable();
  }

  get token() {
    const token = localStorage.getItem('nerdovertoken');
    if (token) return JSON.parse(token) as Token;
    return null;
  }

  constructor(private http: HttpClient) {
    this.loginStatus = new BehaviorSubject(
      !!localStorage.getItem('nerdovertoken')
    );
  }

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', { username, password }).pipe(
      tap((res) => localStorage.setItem('nerdovertoken', JSON.stringify(res))),
      tap(() => this.loginStatus.next(true))
    );
  }

  logout() {
    localStorage.removeItem('nerdovertoken');
    this.loginStatus.next(false);
  }
}
