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

  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  getContact(id:String):Contact {
    return this.contacts.find((element) => element.id == id)
  }
}
