import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('subjectInput') subjectInputRef: ElementRef;
@ViewChild('messageInput') messageInputRef: ElementRef;
currentSender = '18';

clearItems() {
  this.subjectInputRef.nativeElement.value = '';
  this.messageInputRef.nativeElement.value = '';
  }
onAddItem() {
  const subjectValue = this.subjectInputRef.nativeElement.value;
  const msgTextValue = this.messageInputRef.nativeElement.value;

  const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender)
  this.messageService.addMessage(newMessage);
  this.clearItems();
}

  constructor(private messageService:MessageService) { }

  ngOnInit(): void {}

}