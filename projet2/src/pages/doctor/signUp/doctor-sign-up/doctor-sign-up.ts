import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DoctorSignUp2Page} from "../doctor-sign-up2/doctor-sign-up2";

@Component({
  selector: 'page-doctor-sign-up',
  templateUrl: 'doctor-sign-up.html'
})


export class DoctorSignUpPage {

  registerCredentials = {
    fullName: '',
    userName: '',
    email: '',
    cin: '',
    doctorNumber: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(public nav: NavController) {
  }

  next() {
    this.nav.push(DoctorSignUp2Page, {
      fullName: this.registerCredentials.fullName,
      userName: this.registerCredentials.userName,
      email: this.registerCredentials.email,
      cin: this.registerCredentials.cin,
      doctorNumber: this.registerCredentials.doctorNumber,
      password: this.registerCredentials.password
    })
  }


}
