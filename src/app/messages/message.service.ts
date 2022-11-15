import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMaxId(){
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

  getMessages(){
    this.http
    .get('https://cms-application-e9c5c-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      //success function
      (messages : Message[]) => {
        console.log(messages);
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        this.messages.sort((a, b) =>
          a.sender > b.sender ? 1 : b.sender > a.sender ? -1 : 0
        );
        this.messageChangedEvent.next(this.messages.slice());
      },
      // error method
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMessage(id: String): Message {
    return this.messages.find((element) => element.id == id);
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice())
    this.storeMessages();
  }

  storeMessages(){
    const messagesArray = JSON.stringify(this.messages);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-application-e9c5c-default-rtdb.firebaseio.com/messages.json', messagesArray, {
        headers: headers,
      })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      })
  }
}
