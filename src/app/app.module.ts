import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SecondWelcomeComponent } from './second-welcome/second-welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoDialogComponent } from './todo/dialog/todo-dialog/todo-dialog.component';
import { MatFormFieldModule, MatDialogModule } from '@angular/material';
import { HighlightRowDirective } from './directive/highlight-row.directive';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SecondWelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    TodoDialogComponent,
    HighlightRowDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorBasicAuthService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [TodoDialogComponent],
})
export class AppModule {}
