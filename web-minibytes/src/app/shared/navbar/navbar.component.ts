import { Component, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private componentToggler: ComponentTogglerService) { }

  ngOnInit(): void { } 

  openCreateUrlModal(): void {
    this.componentToggler.createUrlModal = true;
  }

}
