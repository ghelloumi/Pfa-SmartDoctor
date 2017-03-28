"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
/*
  Generated class for the Media page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MediaPage = (function () {
    function MediaPage(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.subject = 'Message from Social Sharing App';
        this.message = 'Take your app development skills to the next level with Mastering Ionic 2 - the definitive guide';
        this.image = 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
        this.uri = 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';
    }
    MediaPage.prototype.shareViaEmail = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            ionic_native_1.SocialSharing.canShareViaEmail()
                .then(function () {
                ionic_native_1.SocialSharing.shareViaEmail(_this.message, _this.subject, _this.sendTo)
                    .then(function (data) {
                    console.log('Shared via Email');
                })
                    .catch(function (err) {
                    console.log('Not able to be shared via Email');
                });
            })
                .catch(function (err) {
                console.log('Sharing via Email NOT enabled');
            });
        });
    };
    MediaPage.prototype.shareViaFacebook = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            ionic_native_1.SocialSharing.canShareVia('com.apple.social.facebook', _this.message, _this.image, _this.uri)
                .then(function (data) {
                ionic_native_1.SocialSharing.shareViaFacebook(_this.message, _this.image, _this.uri)
                    .then(function (data) {
                    console.log('Shared via Facebook');
                })
                    .catch(function (err) {
                    console.log('Was not shared via Facebook');
                });
            })
                .catch(function (err) {
                console.log('Not able to be shared via Facebook');
            });
        });
    };
    MediaPage.prototype.shareViaInstagram = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            ionic_native_1.SocialSharing.shareViaInstagram(_this.message, _this.image)
                .then(function (data) {
                console.log('Shared via shareViaInstagram');
            })
                .catch(function (err) {
                console.log('Was not shared via Instagram');
            });
        });
    };
    MediaPage.prototype.sharePicker = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            ionic_native_1.SocialSharing.share(_this.message, _this.subject, _this.image, _this.uri)
                .then(function (data) {
                console.log('Shared via SharePicker');
            })
                .catch(function (err) {
                console.log('Was not shared via SharePicker');
            });
        });
    };
    MediaPage.prototype.shareViaTwitter = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            ionic_native_1.SocialSharing.canShareVia('com.apple.social.twitter', _this.message, _this.image, _this.uri)
                .then(function (data) {
                ionic_native_1.SocialSharing.shareViaTwitter(_this.message, _this.image, _this.uri)
                    .then(function (data) {
                    console.log('Shared via Twitter');
                })
                    .catch(function (err) {
                    console.log('Was not shared via Twitter');
                });
            });
        })
            .catch(function (err) {
            console.log('Not able to be shared via Twitter');
        });
    };
    MediaPage = __decorate([
        core_1.Component({
            selector: 'page-media',
            templateUrl: 'media.html'
        })
    ], MediaPage);
    return MediaPage;
}());
exports.MediaPage = MediaPage;
