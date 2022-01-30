import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  
  constructor(
    public componentToggler: ComponentTogglerService
  ) { }

  ngOnInit(): void { }

  @ViewChild('registerWrapper') registerWrapper: ElementRef;
  @ViewChild('loginWrapper') loginWrapper: ElementRef;

  activeTab: number = 1;

  switchAuthTab(tabName: string): void {
    if (tabName === 'Login') {
      this.activeTab = 1;
      this.loginWrapper.nativeElement.style.display = 'flex';
      this.registerWrapper.nativeElement.style.display = 'none';
      return;
    }

    this.activeTab = 0;
    this.loginWrapper.nativeElement.style.display = 'none';
    this.registerWrapper.nativeElement.style.display = 'flex';
  }

  closeAuthModal(authModal: HTMLElement): void {
    authModal.classList.remove('slide-in-right');
    authModal.classList.add('slide-out-left');

    setTimeout(() => {
      this.componentToggler.authenticationModal = false;
    }, 500);
  }

  registeAccount(registerWrapper): void {
    console.log(registerWrapper);
  }

  loginAccount(loginWrapper): void {
    console.log(loginWrapper);
  }
}