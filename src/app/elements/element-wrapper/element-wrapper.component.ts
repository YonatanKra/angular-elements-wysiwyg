import {Component, ElementRef, Input} from '@angular/core';
import {ElementSpecs} from "../models/element-specs";

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
    const elementType = elementSpecs.type;
    const elementPosition = elementSpecs.position ? elementSpecs.position : {top: 0, left: 0};
    const elementData = elementSpecs.data;

    this._element = document.createElement(elementType);
    this._element['elementData'] = elementData;
    this._element.setAttribute('style',
      `position: absolute; top: ${elementPosition.top}px; left: ${elementPosition.left}px;`);

    this.elRef.nativeElement.appendChild(this._element);
  }
}
