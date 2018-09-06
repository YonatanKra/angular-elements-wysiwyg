import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  private _elementSpecs;
  @Output() saveEvent = new EventEmitter();

  @Input() items;
  @Input()
  set elementSpecs(data) {
    if (!data) {
      return;
    }
    this.toggleDisplay(true);
    this._elementSpecs = Object.assign(data, {
      type: data.type ? data.type + '-editor' : undefined
    });
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
    if (customElement === '') {
      return;
    }
    this.elementSpecs = Object.assign({}, this.elementSpecs, {type: customElement});
  }

  public save() {
    this.saveEvent.emit(this.elementSpecs);
  }
}
