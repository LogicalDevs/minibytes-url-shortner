import { Component, Input, OnInit } from '@angular/core';
import { AlertModal } from 'src/app/interfaces/alert/alert-modal';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() alert: AlertModal;

  constructor(private _componentToggler : ComponentTogglerService) { }

  ngOnInit(): void { 
    console.log('content:', this.alert);

    setTimeout(() => {
      this._componentToggler.alertModal = false;
    }, 3000);
  }

}
