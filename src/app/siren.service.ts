import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import './sireninfo';

@Injectable()
export class SirenService {
  //baseUrl = 'http://editools.ddns.net/sirene/api/';
  //baseUrl = 'https://powertools35.freeboxos.fr/sirene/api/';
  //baseUrl = 'https://yellow-dune-089695710.azurestaticapps.net/api/sirene';
  const baseUrl = 'https://siren-api.azurewebsites.net/api/sirene';

  constructor(private http: Http) { }

  public getSirenInfo(siren: string): Observable<SirenInfo> {
    console.log('getSirenInfo(' + siren + ')');
    //return this.http.get(`${this.baseUrl}values?siren=${siren}`)
    return this.http.get(`${this.baseUrl}?siren=${siren}`)
      .map(res => <SirenInfo>res.json());
      //.catch(err => {console.log('error getSirenInfo'); } );
  }
}
