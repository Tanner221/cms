import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  onSelected(selectedDocument:Document) {
    //console.log(selectedDocument);
    this.selectedDocumentEvent.emit(selectedDocument);
  }

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'New Document', 'Description', 'www.google.com', null),
    new Document('2', 'The Cat in the Hat', 'A cat in a hat', 'www.suess.com', null),
    new Document('3', 'CMS Requirements', 'CSM system', 'www.cms.com', null)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
