import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'cms';

  loadedFeature = 'contacts';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
