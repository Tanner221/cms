import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  
  documents: Document[] = [];
  subscription: Subscription;
  
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
      );
      this.documentService.getDocuments();
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    addDocument() {
      this.router.navigate(['new'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
  }
  