import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../../../login/login";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})


export class ProfilePage {

  title: string ="docteur";
  firstName:string=LoginPage.loggedin.fullName;
  lastName:string="Bradai";
  picture:string="../../../../../../doctorsPics/"+LoginPage.loggedin.picture;
  phone:string="21235985";
  mobilePhone="12547785";
  mail="erzer@rdsd.fr"


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


}
