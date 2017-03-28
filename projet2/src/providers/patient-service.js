"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
/*
  Generated class for the PatientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var PatientService = (function () {
    function PatientService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.apiUrl = this.appSettings.getApiUrl();
        this.data = null;
    }
    PatientService.prototype.getReviews = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + 'api/addpatient')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    PatientService.prototype.createReview = function (patient) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.apiUrl + 'api/addpatient', JSON.stringify(patient), { headers: headers })
            .subscribe(function (res) {
            console.log(res.json());
        });
    };
    PatientService = __decorate([
        core_1.Injectable()
    ], PatientService);
    return PatientService;
}());
exports.PatientService = PatientService;
