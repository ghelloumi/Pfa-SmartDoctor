import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, ToastController, Loading,
  ActionSheetController, Platform, LoadingController, ModalController} from 'ionic-angular';
import {Camera, File, FilePath, Transfer} from 'ionic-native';
import {AppSettings} from "../../../../../providers/app-settings";


declare var cordova: any;

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html'
})


export class TakePicturePage {

  apiUrl = this.appSettings.getApiUrl();
  lastImage: string = null;
  loading: Loading;

  constructor(public modalCtrl: ModalController,public appSettings: AppSettings,
              public platform: Platform, public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController, public nav: NavController,
              public navParams: NavParams, private alertCtrl: AlertController,
              public toastCtrl: ToastController,public view: ViewController) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePicturePage');
  }

  // ionic plugin add cordova-plugin-camera
  // ionic plugin add cordova-plugin-file
  // ionic plugin add cordova-plugin-file-transfer
  // ionic plugin add cordova-plugin-filepath

  public addPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }



  save(): void {
    let pic = {
      pic_path: this.pathForImage(this.lastImage),
      pic_last: this.lastImage
    };
    this.view.dismiss(pic);

  }

  cancel(): void {
    this.view.dismiss();
  }


  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
