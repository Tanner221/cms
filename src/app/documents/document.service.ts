import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

  documents:Document[] = [];

  @Output() docuementSelectedEvent = new EventEmitter<Document>();

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id:String):Document {
    return this.documents.find((element) => element.id == id)
  }
}
