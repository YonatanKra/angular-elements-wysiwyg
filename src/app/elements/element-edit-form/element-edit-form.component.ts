import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-element-edit-form',
  template: `
    <form [formGroup]="form"
          (ngSubmit)="onSubmit()">
      <label *ngFor="let field of fields">
        {{field.displayName}}
        <input [id]="field.property"
               [type]="field.type"
               [formControlName]="field.property">
      </label>

      <button type="submit" class="btn btn-success submit">Update</button>
    </form>
  `,
  styleUrls: ['./element-edit-form.component.css']
})
export class ElementEditFormComponent implements OnInit {

  private _fields: Array<any> = [];
  @Input()
  set fields(val: Array<any>) {
    this._fields = val;
    this.setGroup();
  }

  get fields() {
    return this._fields;
  }

  @Output() submit = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  private setGroup() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.property] = new FormControl(field.value || '');
      if (field.type === 'number') {
        group[field.property].viewToModelUpdate = function(newValue: any)  {
          this.viewModel = parseInt(newValue, 10);
          this.update.emit(this.viewModel);
        };
      }
    });

    this.form = this.formBuilder.group(group);
  }

  ngOnInit() {
    this.setGroup();
  }

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
