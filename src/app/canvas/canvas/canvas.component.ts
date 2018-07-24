import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @Output()
  clickEvent = new EventEmitter();

  @HostListener('click') onClick() {
    this.clickEvent.emit('canvasClicked');
  }
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  addElementToDom(elementSpecs) {
    const elementType = elementSpecs.type;
    const elementPosition = elementSpecs.position;
    const elementData = elementSpecs.data;

    const elementRef = document.createElement(elementType);
    elementRef.setAttribute('element-data', elementData);
    elementRef.setAttribute('style',
      `position: absolute; top: ${elementPosition.top}px; left: ${elementPosition.left}px;`);

    this.elRef.nativeElement.appendChild(elementRef);
  }
}
