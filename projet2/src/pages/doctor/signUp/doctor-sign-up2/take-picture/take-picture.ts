import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the TakePicture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html'
})
export class TakePicturePage {

  constructor(public view: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePicturePage');
  }
  save(): void {

    this.view.dismiss();

  }

  cancel(): void {
    this.view.dismiss();
  }


}
