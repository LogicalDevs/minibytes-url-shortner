import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.scss']
})
export class QrcodeModalComponent implements OnInit {

  constructor(private componentToggler: ComponentTogglerService) { }

  ngOnInit(): void {
  }

  closeModal(modal: HTMLElement): void {
    modal.classList.remove('slide-in-right');
    modal.classList.add('slide-out-left');

    setTimeout(() => {
      this.componentToggler.qrCodeModal = false;
    }, 500);
  }
  
}
