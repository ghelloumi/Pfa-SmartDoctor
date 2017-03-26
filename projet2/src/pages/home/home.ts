import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DoctorHomePage} from "../doctor/doctorHome/doctorHome";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {

  }
  bienvenue(){
    this.nav.push( DoctorHomePage );
  }

}
