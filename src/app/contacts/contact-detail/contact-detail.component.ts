import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) { }
  contact: Contact;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.contact = new Contact('','','','','',null);
    // this.contact = this.contactService.getContact(id);
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.contactService.getContact(id).subscribe(
          response => {
            this.contact = response.contact;
          }
        );
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onDelete() {
    this.contactService.DeleteContact(this.contact);
    this.router.navigateByUrl("/contacts");
  }
}
