import { LoginUserDto } from './../model/login-user-dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  showErrorModal: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toast: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {

    const dto = new LoginUserDto(this.username, this.password);
    this.authService.signin(dto).subscribe(
      data => {
        this.tokenService.setToken(data.jwt);
        this.router.navigate(['/task']);
      },
      err => {
        if (err.status === 422) {
          this.errorMessage = this.translate.instant('ERRORS.INVALID_USER_PASS');
        } else {
          this.errorMessage = err.error.message;
        }
        this.showErrorModal = true;
      }
    );
  }

  closeModal(): void {
    this.showErrorModal = false;
  }

}
