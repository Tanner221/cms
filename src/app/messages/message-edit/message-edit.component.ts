import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { response } from 'express';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
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
currentSender : Contact = null

clearItems() {
  this.subjectInputRef.nativeElement.value = '';
  this.messageInputRef.nativeElement.value = '';
  }
onAddItem() {
  const subjectValue = this.subjectInputRef.nativeElement.value;
  const msgTextValue = this.messageInputRef.nativeElement.value;

  const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender)
  console.log(newMessage);
  return;
  this.messageService.addMessage(newMessage);
  this.clearItems();
}

  constructor(private messageService:MessageService, private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.getContact('19')
    .subscribe(
      response => {
        this.currentSender = response.contact;
      }
    )
  }

}