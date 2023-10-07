import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    return this.http.post('/users/signin', {username, password})
      .pipe(tap((res: any) => {
        localStorage.setItem('access_token', res.token);
      }));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Comprobar si el token ha expirado
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
