"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var DoctorSignUp2Page = (function () {
    function DoctorSignUp2Page(platform, loadingCtrl, actionSheetCtrl, nav, navParams, alertCtrl, toastCtrl, doctorService) {
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.doctorService = doctorService;
        this.lastImage = null;
        this.fullName = this.navParams.get('fullName');
        this.userName = this.navParams.get('userName');
        this.email = this.navParams.get('email');
        this.cin = this.navParams.get('cin');
        this.doctorNumber = this.navParams.get('doctorNumber');
        this.password = this.navParams.get('password');
        this.registerCredentials = {
            telNum: '',
            specialty: ''
        };
    }
    DoctorSignUp2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DoctorSignUp2Page');
    };
    DoctorSignUp2Page.prototype.showCheckbox = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
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
            handler: function (data) {
                _this.component = data;
            }
        });
        alert.present();
    };
    // ionic plugin add cordova-plugin-camera
    // ionic plugin add cordova-plugin-file
    // ionic plugin add cordova-plugin-file-transfer
    // ionic plugin add cordova-plugin-filepath
    DoctorSignUp2Page.prototype.addPhoto = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(ionic_native_1.Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(ionic_native_1.Camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    DoctorSignUp2Page.prototype.takePicture = function (sourceType) {
        var _this = this;
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
        ionic_native_1.Camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === ionic_native_1.Camera.PictureSourceType.PHOTOLIBRARY) {
                ionic_native_1.FilePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    // Create a new name for the image
    DoctorSignUp2Page.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    DoctorSignUp2Page.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        ionic_native_1.File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    DoctorSignUp2Page.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    DoctorSignUp2Page.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    DoctorSignUp2Page.prototype.uploadImage = function () {
        var _this = this;
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
            params: { 'fileName': filename }
        };
        var fileTransfer = new ionic_native_1.Transfer();
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            _this.presentToast('Image succesful uploaded.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Error while uploading file.');
        });
    };
    DoctorSignUp2Page.prototype.addDoctor = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Are you sure?',
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.doctorService.addDoctor(_this.fullName, _this.userName, _this.email, _this.cin, _this.doctorNumber, _this.password, _this.registerCredentials.telNum, _this.registerCredentials.specialty, _this.component, '1').subscribe(function (data) {
                            _this.showToast(data.msg);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    DoctorSignUp2Page.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    DoctorSignUp2Page = __decorate([
        core_1.Component({
            selector: 'page-doctor-sign-up2',
            templateUrl: 'doctor-sign-up2.html'
        })
    ], DoctorSignUp2Page);
    return DoctorSignUp2Page;
}());
exports.DoctorSignUp2Page = DoctorSignUp2Page;
