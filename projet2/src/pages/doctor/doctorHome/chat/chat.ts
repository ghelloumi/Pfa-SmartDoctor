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
  chat_input: string;

  chats = [];
  items = [];


  constructor(public navCtrl: NavController, public doctorService: DoctorService, public appSettings: AppSettings) {
    this.socket = io(this.apiUrl);
    this.socket.on('item', (item) => {
      this.items.push(item.source);
      this.items.push(item.content);
      this.items.push(item.date);

      this.chats.push(item);
    });
  }

  ionViewDidLoad() {
    this.doctorService.getMsg().then((data) => {
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
      source: "X",
      content: msg,
      date: new Date().toISOString()
    };

    if (msg != '') {
      this.socket.emit('item', item);
      this.doctorService.createMsg(item);
    }
    this.chat_input = '';
  }
}
