import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentTogglerService {

  constructor() { }

  authenticationModal = false;
}
