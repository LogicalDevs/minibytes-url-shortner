import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertModal } from 'src/app/interfaces/alert/alert-modal';
import { CreateUser } from 'src/app/interfaces/auth/create-user';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor(
    public componentToggler: ComponentTogglerService,
    private auth: AuthenticationService,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  @Input() actionType: string;
  @Input() alertModal: AlertModal;
  @ViewChild('registerWrapper') registerWrapper: ElementRef;
  @ViewChild('loginWrapper') loginWrapper: ElementRef;

  captcha: string;
  activeTab: number = 1;

  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    if (this.actionType === 'Login') this.switchAuthTab('Login');
    if (this.actionType === 'Register') this.switchAuthTab('Register');

    this.cdRef.detectChanges();
  }


  switchAuthTab(tabName: string): void {
    console.log("entrou");

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

  registeAccount(registerForm, authModal: HTMLElement): void {
    const formData = registerForm.form.value;

    if (registerForm.form.status === 'INVALID') return;
    if (!formData.password === formData.confirmPassword) return;

    const createUser: CreateUser = {
      name_user: formData.username,
      username: formData.username,
      password: formData.password,
      confirmpassword: formData.password,
    }

    this.auth.registerUser(createUser).subscribe(
      data => {
        this.switchAuthTab('Login');
      },
      error => {
        this.alertModal = {
          success: false,
          message: 'Something went wrong!',
          code: error.status
        }

        this.componentToggler.alertModal = true;
      }
    );
  }

  loginAccount(loginForm, authModal: HTMLElement): void {
    this.auth.loginUser(
      loginForm.form.value.username,
      loginForm.form.value.password
      
    ).subscribe(
      data => {
        localStorage.setItem('userToken', data['token']);
        this.sucessAuthentication(authModal);

      },
      error => {
        this.alertModal = {
          success: false,
          message: 'Something went wrong!',
          code: error.status
        }
        this.componentToggler.alertModal = true;
      }
    );
  }

  resolved(captchaResponse: string): void {
    this.captcha = captchaResponse;
    console.log("captcha ->", this.captcha);
  }

  sucessAuthentication(authModal: HTMLElement): void {
    authModal.classList.remove('slide-in-right');
    authModal.classList.add('slide-out-left');

    setTimeout(() => {
      this._router.navigate(['client-panel']);
    }, 500);
  }
}
