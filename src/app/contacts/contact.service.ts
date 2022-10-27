import { outputAst } from '@angular/compiler';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  ContactChangedEvent = new Subject<Contact[]>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: String): Contact {
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
    this.ContactChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId: number = 0;
    //check all documents for highest id
    this.contacts.forEach(doc => {
      let currentId: number = +doc.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.ContactChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let ContactListClone = this.contacts.slice();
    this.ContactChangedEvent.next(ContactListClone);
  }
}
