import { Component, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private componentToggler: ComponentTogglerService,
    public user: UserDataService  
  ) { }

  ngOnInit(): void { } 

  openCreateUrlModal(): void {
    this.componentToggler.createUrlModal = true;
  }

}
