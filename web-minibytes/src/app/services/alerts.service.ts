import { Injectable } from '@angular/core';
import { AlertModal } from '../interfaces/alert/alert-modal';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  alertModal: AlertModal;
}
