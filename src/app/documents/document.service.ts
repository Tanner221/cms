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
    const doc = this.documents.find((element) => {
      return element.id === id
    })
    return doc;
  }

  documentChangedEvent = new EventEmitter<Document[]>();

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }
}
