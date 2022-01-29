import { Component, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public componentToggler : ComponentTogglerService) { }

  ngOnInit(): void {
  }


  callAuthModal(): void {
    this.componentToggler.authenticationModal = true;
  }
}
