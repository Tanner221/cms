import { HttpClient, HttpHeaders } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) { }

  ContactChangedEvent = new Subject<Contact[]>();

  getContacts() {
    this.http
      .get('http://localhost:3000/contacts')
      .subscribe(
        //success function
        (contacts: Contact[]) => {
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
      )
  }

  getContact(id: String): Contact {
    return this.contacts.find((element) => element.id == id)
  }

  DeleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

    // make sure id of the new Document is empty
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Contact }>('http://localhost:3000/contacts',
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
  
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
  
    if (pos < 0) {
      return;
    }
  
    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.ContactChangedEvent.next(this.contacts.slice());
  }
}
