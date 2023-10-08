import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TokenService } from "../services/token.service";
import { HttpClient } from '@angular/common/http';
import { UserResponse } from "../model/user-response.model";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name: string = 'Cargando';
  lastName: string = '...';
  selectedButton: string = '';

  isSidenavOpened: boolean = true;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUserDetails();

    if (window.innerWidth <= 600) {
      this.isSidenavOpened = false;
    }
  }

  selectMenuItem(menuItem: 'taskcreate' | 'task' ): void {
    this.selectedButton = menuItem;

    switch(menuItem) {
      case 'taskcreate':
        this.router.navigate(['/taskcreate']);
        break;
      case 'task':
        this.router.navigate(['/task']);
        break;
    }
  }

  select(button: string) {
    this.selectedButton = button;
  }

  logout() {
    this.tokenService.logOut();
    this.name = '';
    this.lastName = '';
    this.router.navigate(['/login']);
  }

  private getUserDetails(): void {
    const headers = {
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    };

    this.http.get<UserResponse>(environment.apiResrURL + '/users/current', { headers }).subscribe(
      (response: UserResponse) => {
        this.name = response.name;
        this.lastName = response.lastname;
      },
      error => {
        console.error("Error obteniendo los detalles del usuario:", error);
      }
    );
  }
}
