import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/interfaces/auth/create-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  loginUser(username: string, password: string) {
    console.log(username)
    console.log(password)
    
    return this._http.post('http://localhost:3000/auth/signin', { username, password });
  }

  registerUser(createUser: CreateUser) {
    return this._http.post('http://localhost:3000/auth/signup', createUser);
  }
}
