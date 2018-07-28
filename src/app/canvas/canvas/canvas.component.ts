import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: `
    <app-editor-element-wrapper [elementData]="item" *ngFor="let item of items"></app-editor-element-wrapper>`,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  @Input() items = [];
  @Output()
  clickEvent = new EventEmitter();

  @HostListener('click') onClick() {
    this.clickEvent.emit('canvasClicked');
  }
  constructor() { }

}
