import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription:Subscription;

  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.ContactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.contacts = this.contactService.getContacts();
  }
  
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
