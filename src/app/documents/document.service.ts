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
      .get('http://localhost:3000/documents')
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

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

 
updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );
}

  sortAndSend(){
    this.documents.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
    this.documentChangedEvent.next(this.documents.slice());
  }
}
