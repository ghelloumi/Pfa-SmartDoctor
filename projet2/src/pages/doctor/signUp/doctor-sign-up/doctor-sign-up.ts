import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {DoctorSignUp2Page} from "../doctor-sign-up2/doctor-sign-up2";
import {DoctorService} from "../../../../providers/doctor-service";

@Component({
  selector: 'page-doctor-sign-up',
  templateUrl: 'doctor-sign-up.html'
})


export class DoctorSignUpPage {
   verifDoctNum: string;

  registerCredentials = {
    fullName: '',
    userName: '',
    email: '',
    cin: '',
    doctorNumber: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(public nav: NavController,public loadingCtrl: LoadingController,public alertCtrl: AlertController,
              public doctorService: DoctorService) {
  }

  next() {
    this.nav.push(DoctorSignUp2Page, {
      fullName: this.registerCredentials.fullName,
      userName: this.registerCredentials.userName,
      email: this.registerCredentials.email,
      cin: this.registerCredentials.cin,
      doctorNumber: this.registerCredentials.doctorNumber,
      password: this.registerCredentials.password
    });
  }



}
