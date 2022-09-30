import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('subjectInput') subjectInputRef: ElementRef;
@ViewChild('messageInput') messageInputRef: ElementRef;
@Output() messageAdded = new EventEmitter<Message>();

clearItems() {
  this.subjectInputRef.nativeElement.value = '';
  this.messageInputRef.nativeElement.value = '';
  }
onAddItem() {
  const newMessage = new Message('8', this.subjectInputRef.nativeElement.value, this.messageInputRef.nativeElement.value, "Tanner Robinson")
  this.messageAdded.emit(newMessage);
  this.clearItems();
}

  constructor() { }

  ngOnInit(): void {
  }

}
