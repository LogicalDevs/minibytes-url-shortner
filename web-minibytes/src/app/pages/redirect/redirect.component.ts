import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlsService } from 'src/app/services/urls/urls.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _url: UrlsService
  ) { }

  ngOnInit(): void {
    const PARAMS = this._route.snapshot.paramMap.get('url');

    this._url.getUrlToRedirect(PARAMS).subscribe(
      data => {
        if (!(data.length > 0)) this._router.navigate(['home']);

        const REDIRECT = data[0]['main_url'];
        
        window.open(REDIRECT, "_self");
      },
      error => {
        this._router.navigate(['home']);
      }
    );

    console.log(PARAMS);
  }

}
