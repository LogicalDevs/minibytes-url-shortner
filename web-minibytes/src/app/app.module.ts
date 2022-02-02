import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientPanelComponent } from './pages/client-panel/client-panel.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthComponent } from './modals/auth/auth.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthComponent,
    ClientPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
