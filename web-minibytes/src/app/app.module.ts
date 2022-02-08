import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientPanelComponent } from './pages/client-panel/client-panel.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthComponent } from './modals/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth/token.interceptor';
import { QrcodeModalComponent } from './shared/qrcode-modal/qrcode-modal.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { CreateUrlComponent } from './modals/create-url/create-url.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthComponent,
    ClientPanelComponent,
    QrcodeModalComponent,
    AlertModalComponent,
    RedirectComponent,
    CreateUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    CommonModule,
    HttpClientModule,
    ClipboardModule 
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
