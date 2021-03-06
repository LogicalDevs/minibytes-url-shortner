import { Component, Input, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() actionType: string;

  captcha: string;

  constructor(public componentToggler: ComponentTogglerService) { }

  ngOnInit(): void {
  }

  callAuthModal(action: string): void {
    this.actionType = action;
    this.componentToggler.authenticationModal = true;
  }

  resolved(captchaResponse: string): void {
    this.captcha = captchaResponse;
    console.log("captcha ->", this.captcha);
  }
}
