import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {ElementSpecs} from './elements/models/element-specs';
import {Position} from './elements/models/position';

@Component({
  selector: 'app-root',
  template: `
    <app-canvas [items]="elements" (clickEvent)="canvasClick($event)"></app-canvas>
    <app-edit-element (saveEvent)="saveEvent($event)" [elementSpecs]="elementSpecs" [items]="elementsTypes"></app-edit-element>
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
    if (!event.currentTarget) {
      return new Position(0, 0);
    }
    const x = event.currentTarget.style.left + event.pageX;
    const y = event.currentTarget.style.top + event.pageY;
    return new Position(y, x);
  }

  private findElement(id) {
    return this.elements.find(element => element.id === id);
  }

  private findElementIndex(id) {
    return this.elements.findIndex(element => element.id === id);
  }

  canvasClick(data) {
    if (event.target.tagName === 'APP-CANVAS') {
      this.elementSpecs = new ElementSpecs();
      this.elementSpecs.position = this.getEventPosition(event);
    } else {
      this.elementSpecs = this.findElement(event.target.getAttribute('id'));
    }
  }

  saveEvent(data) {
    const elementIndex = this.findElementIndex(data.id);
    if (elementIndex > -1) {
      this.elements[elementIndex] = new ElementSpecs(data, data.id);
    } else {
      this.elements.push(data);
    }
  }
}
