import { Component, OnInit, Injector } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  basicAuthenticationService: BasicAuthenticationService;

  constructor(injector: Injector) {
    this.basicAuthenticationService = injector.get(BasicAuthenticationService);
  }

  ngOnInit() {
    this.basicAuthenticationService.logout();
  }
}
