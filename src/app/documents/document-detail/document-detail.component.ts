import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
onView() {
  this.nativeWindow.open(this.document.url);
}
onEdit() {
  this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
}

onDelete() {
  this.documentService.deleteDocument(this.document);
  //route back to the '/documents' URL
  this.router.navigateByUrl['/documents'];
}

  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService:DocumentService,
    private route:ActivatedRoute,
    private router:Router,
    private windRefService:WindRefService) { 
      this.nativeWindow = windRefService.getNativeWindow();
    }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.document = this.documentService.getDocument(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );
  }

}
