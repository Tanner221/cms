import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http:HttpClient) {}

  ContactChangedEvent = new Subject<Contact[]>();

  getContacts() {
    this.http
    .get('https://cms-application-e9c5c-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      //success function
      (contacts : Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();

        this.contacts.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.ContactChangedEvent.next(this.contacts.slice());
      },
      // error method
      (error: any) => {
        console.log(error);
      }
    );
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
    // this.ContactChangedEvent.next(this.contacts.slice());
    this.storeContacts();
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
    // let contactsListClone = this.contacts.slice();
    // this.ContactChangedEvent.next(contactsListClone);
    this.storeContacts();
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
    // let ContactListClone = this.contacts.slice();
    // this.ContactChangedEvent.next(ContactListClone);
    this.storeContacts();
  }

  storeContacts() {
    const contactsArray = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-application-e9c5c-default-rtdb.firebaseio.com/contacts.json', contactsArray, {
        headers: headers,
      })
      .subscribe(() => {
        this.ContactChangedEvent.next(this.contacts.slice());
      })
  }
}
