import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";
import { UserResponse } from '../model/user-response.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiResrURL + '/users';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    });
  }

  getCurrentlyLoggedInUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/current`, { headers: this.getHeaders() });
  }

}
