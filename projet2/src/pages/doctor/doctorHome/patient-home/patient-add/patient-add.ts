import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

@Component({
  selector: 'page-patient-add',
  templateUrl: 'patient-add.html'
})
export class PatientAddPage {


  nom: any;
  prenom: any;
  age: any;
  maladie: any;

  constructor(public viewCtrl: ViewController) {

  }

  save(): void {

    let patient = {
      nom: this.nom,
      prenom: this.prenom,
      age: this.age,
      maladie: this.maladie
    };

    this.viewCtrl.dismiss(patient);

  }

  close(): void {
    this.viewCtrl.dismiss();
  }

}
