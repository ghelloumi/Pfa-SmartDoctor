import { Component } from '@angular/core';
import { NavController, NavParams,ModalController} from 'ionic-angular';
import {PatientAddPage} from "./patient-add/patient-add";
import {PatientService} from "../../../../providers/patient-service";

/*
  Generated class for the PatientHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patient-home',
  templateUrl: 'patient-home.html'
})
export class PatientHomePage {
  addpatient: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public patientService: PatientService,public modalCtrl: ModalController) {}

  ionViewDidLoad(){

    this.patientService.getReviews().then((data) => {
      this.addpatient = data;
    });

  }

  addReview(){
    let modal = this.modalCtrl.create(PatientAddPage);

    modal.onDidDismiss(patient => {
      if(patient){
        this.addpatient.push(patient);
        this.patientService.createReview(patient);
      }
    });
    modal.present();
  }
}
