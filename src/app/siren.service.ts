import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import './sireninfo';

@Injectable()
export class SirenService {
  //baseUrl = 'http://editools.ddns.net/sirene/api/';
  baseUrl = 'https://powertools35.freeboxos.fr/sirene/api/';

  constructor(private http: Http) { }

  public getSirenInfo(siren: string): Observable<SirenInfo> {
    console.log('getSirenInfo(' + siren + ')');
    return this.http.get(`${this.baseUrl}values?siren=${siren}`)
      .map(res => <SirenInfo>res.json() );
  }
}
