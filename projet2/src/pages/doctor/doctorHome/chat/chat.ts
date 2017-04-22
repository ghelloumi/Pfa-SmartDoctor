import {Component, ViewChild,Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {NavController, Content} from 'ionic-angular';
import * as io from 'socket.io-client';
import {AppSettings} from "../../../../providers/app-settings";
import {DoctorService} from "../../../../providers/doctor-service";
import {Gesture} from 'ionic-angular/gestures/gesture';
import {LoginPage} from "../../../login/login";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})


export class ChatPage {
  @ViewChild(Content) content: Content;

  apiUrl = this.appSettings.getApiUrl();
  socket: any;
  chat_input: string;

  chats = [];
  items = [];

  //to refrech instantally chat
  public itemss: any[] = [];


  constructor(public navCtrl: NavController, public doctorService: DoctorService, public appSettings: AppSettings,el:ElementRef) {
    this.socket = io(this.apiUrl);
    this.socket.on('item', (item) => {
      this.items.push(item.source);
      this.items.push(item.content);
      this.items.push(item.date);
      //this.items.push(item.LoginPage.loggedin.fullName);


      this.chats.push(item);
    });

    //to refrech instantally chat
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        this.itemss[i] = i
      }
    }, 300)
  }
  //long press

  //to refrech instantally chat
  callFunction(){
    this.content.scrollToBottom(0)
  }

  ionViewDidLoad() {
    this.doctorService.getMsg(LoginPage.loggedin._id).then((data) => {
      for (var i = 0; i < data.length; i++) {
        let item = {
          source: null,
          content: null,
          date: null
        };
        this.chats[i] = item;
        this.chats[i].source = data[i].source;
        this.chats[i].content = data[i].content;
        this.chats[i].date = data[i].date;
      }
    });
  }


  send(msg) {
    let item = {
      source: LoginPage.loggedin.fullName,
      content: msg,
      date: new Date().toISOString(),
      doctorId: LoginPage.loggedin._id
    };

    if (msg != '') {
      this.socket.emit('item', item);
      this.doctorService.createMsg(item);
    }
    this.chat_input = '';
  }
}
