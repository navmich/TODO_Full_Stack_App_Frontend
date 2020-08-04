import { Injectable, Injector } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  basicAuthenticationService: BasicAuthenticationService;

  constructor(injector: Injector, private router: Router) {
    this.basicAuthenticationService = injector.get(BasicAuthenticationService);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // jestli je user logged in, pak true -> can activate route
    if (this.basicAuthenticationService.isUserLoggedIn()) {
      return true;
    }
    // jestli neni user logged in, pak false -> can not activate route -> routuje na login page
    this.router.navigate(['login']);
    return false;
  }
}
