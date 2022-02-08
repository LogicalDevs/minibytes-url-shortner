import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private _urls: UrlsService
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
    // if(createNewUrl.form.isValid)
    console.log(createNewUrl.form.status);

    if(createNewUrl.form.status === 'INVALID') return;

    this._urls.createNewUrl(createNewUrl.form.value).subscribe(
      data =>{
        console.log('created ->', data);
        
        setTimeout(() => {
          this.closeNavBar(navbar);
        }, 600);
      },
      error => console.log(error) 
    );
  }
}
