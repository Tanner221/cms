import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentSevice:DocumentService) { }

  ngOnInit(): void {
    this.documentSevice.docuementSelectedEvent.subscribe(event => this.selectedDocument = event)
  }

}
