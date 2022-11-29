import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number

  constructor(private http: HttpClient) {
    this.messages = [];
  }

  getMaxId() {
    let maxId: number = 0;
    //check all documents for highest id
    this.messages.forEach(message => {
      let currentId: number = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  getMessages() {
    this.http
      .get('http://localhost:3000/messages')
      .subscribe(
        //success function
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();

          // this.messages.sort((a, b) =>
          //   a.sender.name > b.sender.name ? 1 : b.sender.name > a.sender.name ? -1 : 0
          // );
          this.messageChangedEvent.next(this.messages.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      )
  }


  getMessage(id: String): Message {
    return this.messages.find((element) => element.id == id);
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new message is empty
    message.id = '';
    //message.sender = new Contact('19','Tanner Robinson','rob16041@byui.edu','5095544633','',null);
    //message.sender._id = '637d07cdd6f1b5b864595767';
    //console.log(message.sender);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, document: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    // this.messages.sort((a, b) =>
    //   a.sender.name > b.sender.name ? 1 : b.sender.name > a.sender.name ? -1 : 0
    // );
    this.messageChangedEvent.next(this.messages.slice());
  }
}
