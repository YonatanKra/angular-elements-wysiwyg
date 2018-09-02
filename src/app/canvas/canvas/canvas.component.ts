import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ElementSpecs} from '../../elements/models/element-specs';

@Component({
  selector: 'app-canvas',
  template: `
    <app-element-wrapper [elementData]="item" *ngFor="let item of items"></app-element-wrapper>`,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  @Input() items: Array<ElementSpecs> = [];
  @Output()
  clickEvent = new EventEmitter();

  @HostListener('click') onClick() {
    this.clickEvent.emit('canvasClicked');
  }
  constructor() { }

}
