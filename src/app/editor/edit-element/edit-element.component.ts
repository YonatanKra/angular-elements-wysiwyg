import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementSpecs} from "../../elements/models/element-specs";

@Component({
  selector: 'app-edit-element',
  template: `
    <form>
      <select #typeSelector (change)="typeChange(typeSelector.value)">
        <option value="">Please Choose...</option>
        <option *ngFor="let item of items" [value]="item.type">{{item.displayName}}</option>
      </select>
      <app-element-wrapper [elementData]="elementSpecs"></app-element-wrapper>
    </form>
  `,
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent implements OnInit {

  private _elementSpecs: ElementSpecs;
  private _elementType: string;
  @Output() saveEvent = new EventEmitter();

  @Input() items;
  @Input()
  set elementSpecs(data: ElementSpecs) {
    if (!data) {
      return;
    }
    this.toggleDisplay(true);
    this._elementType = data.type;
    this._elementSpecs = new ElementSpecs(data);
    this._elementSpecs.type = data.type.length ? data.type + '-editor' : data.type;

    this._elementSpecs.events = {
      submitEvent: (event) => {
        this._elementSpecs.data = event.detail;
        this.save();
      }
    };
  }

  get elementSpecs() {
    return this._elementSpecs;
  }

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  private toggleDisplay(val) {
    this.elRef.nativeElement.style.display = val ? 'block' : 'none';
  }

  public typeChange(customElement) {
    this._elementType = customElement;
    if (customElement === '') {
      return;
    }
    this.elementSpecs = new ElementSpecs(Object.assign({}, this.elementSpecs, {type: customElement}), this.elementSpecs.id);
  }

  public save() {
    this.saveEvent.emit(new ElementSpecs(Object.assign({}, this.elementSpecs, {type: this._elementType}), this.elementSpecs.id));
  }
}
