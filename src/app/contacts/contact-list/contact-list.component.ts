import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  term : string
  
  constructor(private contactService:ContactService,
    private router:Router,
    private route:ActivatedRoute) { }
    
    ngOnInit(): void {
      this.subscription = this.contactService.ContactChangedEvent.subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
        );
        
      this.contactService.getContacts();
      }
      
      ngOnDestroy(): void {
        this.subscription.unsubscribe();
      }
      
      addContact() {
        this.router.navigate(['new'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
      }

      search(term: string) {
        this.term = term;
      }
    }
