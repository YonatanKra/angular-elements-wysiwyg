import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {ElementSpecs} from './elements/models/element-specs';
import {Position} from './elements/models/position';

@Component({
  selector: 'app-root',
  template: `
    <app-canvas [items]="elements" (clickEvent)="canvasClick($event)"></app-canvas>
    <app-edit-element [elementSpecs]="elementSpecs" [items]="elementsTypes"></app-edit-element>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public elements: Array<ElementSpecs> = [];
  public elementSpecs: ElementSpecs;
  public elementsTypes = [
    {
      type: 'box-with-text',
      displayName: 'Box with text'
    }
  ];

  constructor(private dataService: DataService) {
    dataService.canvasData.subscribe((data) => {
      this.elements = data;
    });
    dataService.getCanvasData();
  }

  private getEventPosition(event) {
    const x = event.currentTarget.style.left + event.pageX;
    const y = event.currentTarget.style.top + event.pageY;
    return new Position(y, x);
  }

  canvasClick(data) {
    this.elementSpecs = new ElementSpecs();

    this.elementSpecs.position = this.getEventPosition(event);

  }
}
