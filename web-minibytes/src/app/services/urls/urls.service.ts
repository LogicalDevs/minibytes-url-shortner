import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUrl } from 'src/app/interfaces/url/get-url';
import { config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(private _http: HttpClient) { }

  getUrlList(): Observable<GetUrl[]> {
    return this._http.get<GetUrl[]>(`http://${config.apiUrl}/urls`);
  }

  getUrlToRedirect(shortUrlId: string): Observable<GetUrl[]> {
    return this._http.get<GetUrl[]>(`http://${config.apiUrl}/urls/byShortUrl/${shortUrlId}`);
  }
}
