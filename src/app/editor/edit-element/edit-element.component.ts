import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-element',
  template: `
    <form>
      <select>
        <option *ngFor="let item of items" value="item.value">{{item.displayName}}</option>
      </select>
      <app-editor-element-wrapper [elementData]="_elementSpecs"></app-editor-element-wrapper>
      \`,
    </form>
  `,
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent implements OnInit {

  public _elementSpecs = {};
  @Output() saveEvent = new EventEmitter();

  @Input() items;
  @Input()
  set elementSpecs(data) {
    this.toggleDisplay(true);
    this._elementSpecs = {
      type: data.type + '-editor'
    };
  }
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  private toggleDisplay(val) {
    this.elRef.nativeElement.style.display = val ? 'block' : 'none';
  }

  public save() {

  }
}
