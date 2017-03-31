import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatService} from '../../../../providers/chat-service';
import * as io from 'socket.io-client';
import {AppSettings} from "../../../../providers/app-settings";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  apiUrl = this.appSettings.getApiUrl();
  socket: any;
  reviews: any;
  chat_input: string;
  chats = [];


  constructor(public navCtrl: NavController, public chatService: ChatService, public appSettings: AppSettings) {
    this.socket = io(this.apiUrl);
    this.socket.on('message', (msg) => {
      this.chats.push(msg);
    });
  }

  ionViewDidLoad() {
    this.chatService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
      for(var i=0;i<data.length;i++){
        this.chats[i]=data[i].description;
      }

    });
  }

  send(msg) {
    let review = {
      title: "f",
      description: msg,
      rating: "42"
    };
    if (msg != '') {
      this.socket.emit('message', msg);
      this.reviews.push(review);
      this.chatService.createReview(review);
    }
    this.chat_input = '';
  }
}
