import { outputAst } from '@angular/compiler';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  
  contacts:Contact[] = []
  
  @Output() ContactChangedEvent = new EventEmitter<Contact[]>();
  
  getContacts(): Contact[]{
    return this.contacts.slice();
  }
  
  getContact(id:String):Contact {
    return this.contacts.find((element) => element.id == id)
  }

  DeleteContact(contact: Contact) {
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.ContactChangedEvent.emit(this.contacts.slice());
  }
}
