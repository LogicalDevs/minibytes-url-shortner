import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUrl } from 'src/app/interfaces/url/get-url';
import { config } from 'src/app/config';
import { UserDataService } from '../user/user-data.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(
    private _http: HttpClient,
    private _user: UserDataService
  ) { }

  getUrlList(): Observable<GetUrl[]> {
    return this._http.get<GetUrl[]>(`http://${config.apiUrl}/urls/9`);
  }

  getUrlToRedirect(shortUrlId: string): Observable<GetUrl[]> {
    return this._http.get<GetUrl[]>(`http://${config.apiUrl}/urls/byShortUrl/${shortUrlId}`);
  }

  createNewUrl(createUrlForm) {
    createUrlForm.id_user = this._user.userPayload.id;
    
    return this._http.post(`http://${config.apiUrl}/urls`, createUrlForm);
  }
}
