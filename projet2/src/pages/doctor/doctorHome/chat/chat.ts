import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as io from 'socket.io-client';
import {AppSettings} from "../../../../providers/app-settings";
import {DoctorService} from "../../../../providers/doctor-service";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  apiUrl = this.appSettings.getApiUrl();
  socket: any;
  msgs: any;
  chat_input: string;

  chats = [];
  items = [];


  constructor(public navCtrl: NavController, public doctorService: DoctorService, public appSettings: AppSettings) {
    this.socket = io(this.apiUrl);
    this.socket.on('content', (msg) => {
      this.chats.push(msg);
    });
  }

  ionViewDidLoad() {
    this.doctorService.getMsg().then((data) => {
      this.msgs = data;
      for(var i=0;i<data.length;i++){
        this.chats[i]=data[i].content;

      }
    });
  }

  send(msg) {
    let message = {
      source: "f",
      content: msg,
      date: new Date().toISOString()
    };
    if (msg != '') {
      this.socket.emit('content', message.content);
      this.msgs.push(message);
      this.doctorService.createMsg(message);
    }
    this.chat_input = '';
  }
}
