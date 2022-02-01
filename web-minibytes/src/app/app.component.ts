import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser'
import { TokenService } from './services/auth/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-minibytes';

  constructor(private meta: Meta, private _token: TokenService) {
    this.meta.addTag({ name: 'viewport', content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" });
  }

  ngOnInit(): void {
    this._token.verifyLogin();
  }
}
