import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-minibytes';

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'viewport', content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" });
  }
}
