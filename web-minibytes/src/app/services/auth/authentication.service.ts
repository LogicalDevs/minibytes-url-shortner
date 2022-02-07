import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from 'src/app/interfaces/auth/create-user';
import { config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  loginUser(username: string, password: string) {
    console.log(username)
    console.log(password)
    
    return this._http.post(`http://${config.apiUrl}/auth/signin`, { username, password });
  }

  registerUser(createUser: CreateUser) {
    return this._http.post(`http://${config.apiUrl}/auth/signup`, createUser);
  }
}
