import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(
    private _componentToggler: ComponentTogglerService,
    public alert: AlertsService
  ) { }

  ngOnInit(): void { 
    console.log('content:', this.alert.alertModal);

    setTimeout(() => {
      this._componentToggler.alertModal = false;
    }, 3000);
  }

}
