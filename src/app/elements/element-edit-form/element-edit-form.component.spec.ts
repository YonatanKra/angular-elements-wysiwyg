import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementEditFormComponent } from './element-edit-form.component';
import {ElementSpecs} from '../models/element-specs';
import {Position} from '../models/position';
import {ReactiveFormsModule} from "@angular/forms";

describe('ElementEditFormComponent', () => {
  let component: ElementEditFormComponent;
  let fixture: ComponentFixture<ElementEditFormComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ElementEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementEditFormComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('input fields', () => {
    it('should set inputs according to JSON', () => {
      const dataFields = [
        {
          type: 'text',
          displayName: 'name 1',
          property: 'name1'
        },
        {
          type: 'number',
          displayName: 'number 1',
          property: 'num1'
        }
      ];

      component.fields = dataFields;

      fixture.detectChanges();

      const inputElements = element.querySelectorAll('input');
      expect(inputElements.length).toEqual(2);
      dataFields.forEach((dataField, index) => {
        expect(inputElements[index].getAttribute('type')).toEqual(dataField.type);
      });
    });
  });

  describe('submit button', () => {
    it('should emit an event with the form\'s data', () => {

      spyOn(component.submit, 'emit');

      const dataFields = [
        {
          type: 'text',
          displayName: 'name 1',
          property: 'name1'
        },
        {
          type: 'number',
          displayName: 'number 1',
          property: 'num1'
        }
      ];

      component.elementData = {
        name1: 'name2',
        num1: 2
      };

      component.fields = dataFields;

      fixture.detectChanges();

      component.form.controls.name1.setValue('name1');
      component.form.controls.num1.setValue(0);

      const button = fixture.debugElement.nativeElement.querySelector('button.submit');
      button.click();

      expect(component.submit.emit).toHaveBeenCalledWith({
        name1: 'name1', num1: 0
      });
    });
  });
});
