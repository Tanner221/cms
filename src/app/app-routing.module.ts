import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { Contact } from './contacts/contact.model';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents', component: DocumentsComponent, children: [
      { path: 'new', component: DocumentEditComponent },
      { path: ':id', component: DocumentDetailComponent },
      { path: ':id/edit', component: DocumentEditComponent }
    ]
  },
  {
    path: 'contacts', component: ContactsComponent, children: [
      { path: 'new', component: ContactEditComponent },
      { path: ':id', component: ContactDetailComponent },
      { path: ':id/edit', component: ContactEditComponent }
    ]
  },
  { path: 'messages', component: MessagesComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
