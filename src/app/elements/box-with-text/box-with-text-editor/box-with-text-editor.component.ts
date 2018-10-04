import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoxWithTextFormModel} from '../models/box-with-text-form-model';
import {FormFieldsModel} from '../../models/form-fields';

@Component({
  selector: 'app-box-with-text-editor',
  template: `
    <app-element-edit-form [fields]="fields" (submit)="onDataSubmit($event)"></app-element-edit-form>
  `,
  styleUrls: ['./box-with-text-editor.component.css']
})
export class BoxWithTextEditorComponent {

  private _elementData: any = {};

  @Input()
  set elementData (data) {
    this._elementData = data;
    this.combineModelWithData(data);
  }

  get elementData (): any {
    return this._elementData;
  }

  @Output() submitEvent = new EventEmitter();
  public fields: Array<FormFieldsModel>;

  constructor() {
    this.fields = JSON.parse(JSON.stringify(BoxWithTextFormModel));
    this.combineModelWithData(this.elementData);
  }

  onDataSubmit(data) {
    event.stopPropagation();
    this.submitEvent.emit(data);
  }

  private combineModelWithData(data) {
    this.fields.forEach(field => {
      field.value = data[field.property];
    });
  }
}
