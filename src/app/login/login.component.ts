import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
  isValid: boolean;
  basicAuthenticationService: BasicAuthenticationService;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    injector: Injector
  ) {
    this.fg = this.fb.group({
      username: [''],
      password: [''],
    });
    this.basicAuthenticationService = injector.get(BasicAuthenticationService);
  }

  ngOnInit() {}

  handleBasicAuthLogin() {
    this.basicAuthenticationService
      .executeAuthenticationService(
        this.fg.get('username').value,
        this.fg.get('password').value
      )
      .subscribe(
        (data) => {
          console.log('Message from backend (success): ' + data.message);
          console.log(data);
          this.isValid = true;
          this.router.navigate(['welcome', this.fg.get('username').value]);
        },
        (error) => {
          console.log('Message from backend (error): ' + error);
          this.isValid = false;
        }
      );
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService
      .executeJWTAuthenticationService(
        this.fg.get('username').value,
        this.fg.get('password').value
      )
      .subscribe(
        () => {
          this.isValid = true;
          this.router.navigate(['welcome', this.fg.get('username').value]);
        },
        (error) => {
          console.log('Message from backend (error): ' + error);
          this.isValid = false;
        }
      );
  }
}
