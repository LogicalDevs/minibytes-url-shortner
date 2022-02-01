import { Injectable } from '@angular/core';
import { Payload } from 'src/app/interfaces/auth/payload';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  userPayload: Payload;
  userToken: string = localStorage.getItem('userItem');
}
