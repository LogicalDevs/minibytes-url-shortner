import { Component, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.scss']
})
export class CreateUrlComponent implements OnInit {

  constructor(private componentToggler: ComponentTogglerService) { }

  ngOnInit(): void {
  }

  closeNavBar(navbar: HTMLElement): void {
    navbar.classList.remove('slide-in-left');
    navbar.classList.add('slide-out-left');

    setTimeout(() => {
      this.componentToggler.createUrlModal = false;
    }, 600);
  }
}
