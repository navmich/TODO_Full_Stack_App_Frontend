import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {
  basicAuthenticationService: BasicAuthenticationService;

  constructor(injector: Injector) {
    this.basicAuthenticationService = injector.get(BasicAuthenticationService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let basicAuthHeaderToken = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderToken && username) {
      // request nemuzeme modifikovat, proto pouzijeme 'clone'
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderToken,
        },
      });
    }

    return next.handle(request);
  }
}
