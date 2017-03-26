import {Component} from '@angular/core';
import {
  NavController, NavParams, AlertController, ToastController, Loading,
  ActionSheetController, Platform, LoadingController
} from 'ionic-angular';


import {Camera, File, FilePath, Transfer} from 'ionic-native';
import {DoctorService} from "../../../../providers/doctor-service";

declare var cordova: any;

@Component({
  selector: 'page-doctor-sign-up2',
  templateUrl: 'doctor-sign-up2.html'
})
export class DoctorSignUp2Page {

  lastImage: string = null;
  loading: Loading;
  component: string;

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

  constructor(public platform: Platform, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public nav: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController, public doctorService: DoctorService) {
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

  public uploadImage() {
    // Destination URL
    var url = "http://192.168.0.55:3001/doctorsPics";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

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
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
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
