import { Observable } from 'rxjs';
import { LoginUserDto } from './../model/login-user-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenDto } from '../model/jwt-token-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.apiResrURL + '/users/signin';

  constructor(private httpClient: HttpClient) { }

  public signin(dto: LoginUserDto): Observable<JwtTokenDto> {
    return this.httpClient.post<JwtTokenDto>(this.authURL, dto);
  }
}
