import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { UrlsService } from 'src/app/services/urls/urls.service';

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.scss']
})
export class CreateUrlComponent implements OnInit {

  constructor(
    public componentToggler: ComponentTogglerService,
    private _urls: UrlsService,
    private _alerts: AlertsService
  ) { }
    
  ngOnInit(): void { }

  closeNavBar(navbar: HTMLElement): void {
    navbar.classList.remove('slide-in-left');
    navbar.classList.add('slide-out-left');

    setTimeout(() => {
      this.componentToggler.createUrlModal = false;
    }, 600);
  }

  createNewUrlForm(createNewUrl: NgForm, navbar: HTMLElement): void {
    console.log(createNewUrl.form.status);

    if(createNewUrl.form.status === 'INVALID') {
      this._alerts.alertModal = {
        success: false,
        message: 'Please verify your inputs!',
        code: 400
      }
      
      this.componentToggler.alertModal = true;
      return;
    } 

    this._urls.createNewUrl(createNewUrl.form.value).subscribe(
      data =>{
        console.log('created ->', data);
        
        setTimeout(() => {
          this.closeNavBar(navbar);
        }, 600);
      },
      error => {
        this._alerts.alertModal = {
          success: false,
          message: 'Something  went wrong!',
          code: 0
        }
        
        this.componentToggler.alertModal = true;
      } 
    );
  }
  
}
