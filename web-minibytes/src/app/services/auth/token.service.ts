import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Payload } from 'src/app/interfaces/auth/payload';
import { UserDataService } from '../user/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private _userData: UserDataService,
    private _router: Router
  ) {}

  decodeToken(currentToken: string): void {
    const HELPER = new JwtHelperService();
    const PAYLOAD: Payload = HELPER.decodeToken(currentToken);

    this._userData.userPayload = PAYLOAD;
  }

  verifyLogin(): void {
    const TOKEN = localStorage.getItem('userToken');

    if(!TOKEN) {
      this._router.navigate(['/home']);
      return;
    }

    this.decodeToken(TOKEN);
  }
}
