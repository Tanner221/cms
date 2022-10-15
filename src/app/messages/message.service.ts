import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   @Output() messageChangedEvent = new EventEmitter<Message[]>();

  messages:Message[] = [];

  getMessages():Message[]{
    return this.messages.slice()
  }

  getMessage(id:String):Message{
    return this.messages.find((element) => element.id == id);
  }

  addMessage(message:Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice())
  }
}
