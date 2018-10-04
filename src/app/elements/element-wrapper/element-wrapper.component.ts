import {Component, ElementRef, Input} from '@angular/core';
import {ElementSpecs} from '../models/element-specs';

@Component({
  selector: 'app-element-wrapper',
  template: ``,
  styleUrls: ['./element-wrapper.component.css']
})
export class ElementWrapperComponent {

  private _element: HTMLElement;

  @Input()
  set elementData(elementSpecs: ElementSpecs) {
    if (!elementSpecs) {
      return;
    }

    if (this._element) {
      this._element.remove();
    }

    this.addElementToDom(elementSpecs);
  }

  constructor(private elRef: ElementRef) {
  }

  private addElementToDom(elementSpecs: ElementSpecs) {
    if (!elementSpecs.type || elementSpecs.type.length == 0) {
      return;
    }
    const elementType = elementSpecs.type;
    const elementPosition = elementSpecs.position ? elementSpecs.position : {top: 0, left: 0};
    const elementData = elementSpecs.data;

    this._element = document.createElement(elementType);
    this._element['elementData'] = elementData;
    this._element.setAttribute('style',
      `top: ${elementPosition.top}px; left: ${elementPosition.left}px;`);
    elementSpecs.id ? this._element.setAttribute('id', elementSpecs.id) : null;

    const events = elementSpecs.events;
    if (events) {
      Object.keys(events).forEach(key => {
        this._element.addEventListener(key, events[key]);
      });
    }
    this.elRef.nativeElement.appendChild(this._element);
  }
}
