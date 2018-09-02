import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {ElementSpecs} from './elements/models/element-specs';

@Component({
  selector: 'app-root',
  template: `
    <app-canvas [items]="elements"></app-canvas>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public elements: Array<ElementSpecs> = [];

  constructor(private dataService: DataService) {
    dataService.canvasData.subscribe((data) => {
      this.elements = data;
    });
    dataService.getCanvasData();
  }
}
