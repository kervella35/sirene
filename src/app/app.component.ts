import { Component, Input, NgModule } from '@angular/core';
import { SirenService } from './siren.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SirenService]
})

export class AppComponent {
  title = 'Siren Checker 2.0';
  siretStyle: any;

  @Input()
  siren: string;

  siretInformation: string;
  information: string;
  sirenOk = false;
  isIndiceZero = true;
  isIndiceMax = true;

  private noStyle = {};

  constructor(private sirenService: SirenService) {
  //  constructor AppComponent() {
  }

  sumSiren(siren: string, start: number = 0): number {
    let sum: number;

    sum = 0;
    for (let i = 0; i < siren.length; i++) {
      const ch = Number(siren[i]);

      if (i % 2 === start) {
        sum += ch;
      } else if (ch < 5) {
        sum += (<number><any>ch) * 2;
      } else {
        sum += (<number><any>ch) * 2 - 9;
      }
    }

    return sum;
  }

  checkSiren(siren: string) {
    let sum: number;

    if (siren.length !== 9) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < siren.length; i++) {
      if ('0' > siren[i] || siren[i] > '9') {
        return false;
      }

      const ch = Number(siren[i]);

      if (i % 2 === 0) {
        sum += ch;
      } else if (ch < 5) {
        sum += (<number><any>ch) * 2;
      } else {
        sum += (<number><any>ch) * 2 - 9;
      }
    }
    if (sum === 0)
      return false;

    console.log('sum/SIREN=' + sum);

    return (sum % 10 === 0);
  }

  checkSiret(siret: string) {
    if (siret.length !== 14) {
      return false;
    }
    if (!this.checkSiren(siret.substring(0, 9)))
      return false;

    let sum = 0;
    for (let i = 0; i < siret.length; i++) {
      if ('0' > siret[i] || siret[i] > '9') {
        return false;
      }

      const ch = Number(siret[i]);
      if (i % 2 === 1) {
        sum += ch;
      } else if (ch < 5) {
        sum += ch * 2;
      } else {
        sum += ch * 2 - 9;
      }
    }
    if (sum === 0) {
      return false;
    }
    console.log('sum/SIRET=' + sum);
    return (sum % 10 === 0);
  }

  onKeyUp(event: any) {
    // console.log( event );
  }

  isValidSiren() {
    return this.sirenOk;
  }

  indiceZero() {
    return this.isIndiceZero;
  }

  indiceMax() {
    return this.isIndiceMax;
  }

  nextSiren(siren: string, increment: number = 1, start: number = 0) {
    let seq: number;
    let sirenTemp: string;

    this.isIndiceZero = false;
    this.isIndiceMax = false;
    if (start === 0) {  // SIREN
      seq = Number(siren.substring(0, 8)) + increment;

      sirenTemp = '' + seq;
      while (sirenTemp.length < 8) {
        sirenTemp = '0' + sirenTemp;
      }
    } else {            // SIRET
      seq = Number(siren.substring(9, 13)) + increment;
      sirenTemp = '' + seq;
      while (sirenTemp.length < 4) {
        sirenTemp = '0' + sirenTemp;
      }
      sirenTemp = siren.substring(0, 9) + sirenTemp;
    }
    const sum: number = this.sumSiren( sirenTemp, start ) % 10;

    sirenTemp = sirenTemp + ((10 - sum) % 10);

    return sirenTemp;
  }

  onNextSiren(event: any) {

    if (this.siren.length === 9) {
      this.siren = this.nextSiren( this.siren );
    } else if (this.siren.length === 14) {
      this.siren = this.nextSiren( this.siren, 1, 1 );
    }
    this.onChange( null );
  }

  onPrevSiren(event: any) {

    if (this.siren.length === 9) {
      this.siren = this.nextSiren( this.siren, -1 );
    } else if (this.siren.length === 14) {
      this.siren = this.nextSiren( this.siren, -1, 1 );
    }
    this.onChange( null );
  }

  onChange(event: any) {

    //console.log( event );

    if (this.siren.length === 9) {
      const isOK = this.checkSiren( this.siren );
      this.sirenOk = isOK;
      this.information = isOK ? 'OK' : 'KO';
      this.siretInformation = '';
      if (isOK) {
        this.siretStyle = {'background-color': 'lightgreen'};

        this.sirenService.getSirenInfo(this.siren)
            .subscribe( x => this.siretInformation = x.Libelle1 + ' ' + x.Libelle2,
                        error => console.log( error) );
      } else {
        this.siretStyle = {'background-color': 'salmon'};
      }
      const indice: number = Number(this.siren.substring(0, 8));
      this.isIndiceMax = indice === 99999999;
      this.isIndiceZero = indice === 0;
    } else if (this.siren.length === 14) {
      const isOK = this.checkSiret( this.siren );
      this.sirenOk = isOK;
      this.information = isOK ? 'OK' : 'KO';
      this.siretInformation = '';
      if (isOK) {
        this.siretStyle = {'background-color': 'lightgreen'};

        this.sirenService.getSirenInfo(this.siren)
            .subscribe( x => this.siretInformation = x.Libelle1 + ' ' + x.Libelle2 ,
                        error => console.log('error:' + error) );
      } else {
        this.siretStyle = {'background-color': 'salmon'};
      }
      const indice: number = Number(this.siren.substring(9, 13));
      this.isIndiceMax = indice === 9999;
      this.isIndiceZero = indice === 0;
    } else {
      this.sirenOk = false;
      this.siretInformation = '';
      this.information = this.siren;
      this.siretStyle = this.noStyle;
    }
  }

}
