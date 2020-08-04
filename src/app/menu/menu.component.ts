import { Component, OnInit, Injector } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  basicAuthenticationService: BasicAuthenticationService;

  constructor(injector: Injector) {
    this.basicAuthenticationService = injector.get(BasicAuthenticationService);
  }
}
