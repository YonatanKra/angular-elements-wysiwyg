import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxWithTextEditorComponent } from './box-with-text-editor.component';
import {Component, DebugElement, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BoxWithTextFormModel} from '../models/box-with-text-form-model';

@Component({
  selector: 'app-element-edit-form',
  template: `

  `,
})
class ElementEditFormMockComponent {
  @Input() fields: any;
  @Output() submit = new EventEmitter();
}

  describe('BoxWithTextEditorComponent', () => {
  let component: BoxWithTextEditorComponent;
  let fixture: ComponentFixture<BoxWithTextEditorComponent>;
  let editFormDebugElement: DebugElement;
  let editFormComponent: ElementEditFormMockComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxWithTextEditorComponent, ElementEditFormMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxWithTextEditorComponent);
    component = fixture.componentInstance;
    editFormDebugElement = fixture.debugElement.query(By.directive(ElementEditFormMockComponent));
    editFormComponent = editFormDebugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should append element-edit-form', () => {
    const element = fixture.debugElement.nativeElement;
    const formElement = element.querySelector('app-element-edit-form');

    expect(formElement).toBeTruthy();
  });

  it(`should emit the data coming from child's observable`, () => {

    const value = Math.random().toString();
    spyOn(component.submitEvent, 'emit').and.callThrough();
    editFormComponent.submit.next(value);

    expect(component.submitEvent.emit).toHaveBeenCalledWith(value);

  });

  it('should set the fields of the form with correct data', () => {
    const data = {};
    const formModel = JSON.parse(JSON.stringify(BoxWithTextFormModel));
    formModel.forEach(field => {
      data[field.property] = Math.random().toString();
      field.value = data[field.property];
    });
    component.elementData = data;
    expect(editFormComponent.fields).toEqual(formModel);
  });
});
