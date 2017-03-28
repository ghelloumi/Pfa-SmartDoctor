import {Component} from '@angular/core';
import {
  NavController, NavParams, AlertController, ToastController, Loading, Platform, LoadingController, ModalController
} from 'ionic-angular';


import {Transfer} from 'ionic-native';
import {DoctorService} from "../../../../providers/doctor-service";
import {AppSettings} from "../../../../providers/app-settings";
import {TakePicturePage} from "./take-picture/take-picture";

declare var cordova: any;
var a,b: string;

@Component({
  selector: 'page-doctor-sign-up2',
  templateUrl: 'doctor-sign-up2.html'
})
export class DoctorSignUp2Page {
  apiUrl = this.appSettings.getApiUrl();

  loading: Loading;
  component: string;
  pic:string;

  fullName = this.navParams.get('fullName');
  userName = this.navParams.get('userName');
  email = this.navParams.get('email');
  cin = this.navParams.get('cin');
  doctorNumber = this.navParams.get('doctorNumber');
  password = this.navParams.get('password');


  registerCredentials = {
    telNum: '',
    specialty: ''
  };

  constructor(public modalCtrl: ModalController,public appSettings: AppSettings,
              public platform: Platform, public loadingCtrl: LoadingController,
              public nav: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, public toastCtrl: ToastController,
              public doctorService: DoctorService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorSignUp2Page');
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Which components do you have?');

    alert.addInput({
      type: 'checkbox',
      label: 'comp1',
      value: 'comp1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'comp2',
      value: 'comp2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'comp3',
      value: 'comp3'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'comp4',
      value: 'comp4'
    });

    alert.addButton('Cancel');

    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.component = data;
      }
    });
    alert.present();
  }

  public uploadImage(c,d) {
    // Destination URL
    var url = this.apiUrl+"doctorsPics";

    // File for Upload
    var targetPath =c;

    // File name only
    var filename = d;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };

    const fileTransfer = new Transfer();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.showToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.showToast('Error while uploading file.');
    });
  }


  addPicture(){

    let modal = this.modalCtrl.create(TakePicturePage);
    modal.onDidDismiss(pic => {
      a=pic.pic_path;
      b=pic.pic_last;
      this.pic="file-"+b;
    });
    modal.present();

  }

  addDoctor() {
    let prompt = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: data => {
            this.uploadImage(a,b),
            this.doctorService.addDoctor(
              this.fullName,
              this.userName,
              this.email,
              this.cin,
              this.doctorNumber,
              this.password,
              this.registerCredentials.telNum,
              this.registerCredentials.specialty,
              this.component,
              this.pic,
              '1'
            ).subscribe(data => {
              this.showToast(data.msg);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
