import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) { }

  getDocuments() {
    this.http
      .get('https://cms-application-e9c5c-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        //success function
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.documentChangedEvent.next(this.documents.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      )
  }

  getDocument(id: String): Document {
    const doc = this.documents.find((element) => {
      return element.id === id
    })
    return doc;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId: number = 0;
    //check all documents for highest id
    this.documents.forEach(doc => {
      let currentId: number = +doc.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // let documentsListClone = this.documents.slice();
    // this.documentChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // let documentsListClone = this.documents.slice();
    // this.documentChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  storeDocuments() {
    const documentsArray = JSON.stringify(this.documents);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-application-e9c5c-default-rtdb.firebaseio.com/documents.json', documentsArray, {
        headers: headers,
      })
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents.slice());
      })
  }
}
