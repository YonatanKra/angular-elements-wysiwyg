import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementEditFormComponent } from './element-edit-form.component';
import {ElementSpecs} from '../models/element-specs';
import {Position} from '../models/position';
import {ReactiveFormsModule} from '@angular/forms';

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
    it('should set inputs according to JSON and model', () => {
      const dataFields = [
        {
          type: 'text',
          displayName: 'name 1',
          property: 'name1',
          value: Math.random().toString()
        },
        {
          type: 'number',
          displayName: 'number 1',
          property: 'num1',
          value: Math.random()
        }
      ];

      component.fields = dataFields;

      fixture.detectChanges();

      const inputElements = element.querySelectorAll('input');
      expect(inputElements.length).toEqual(2);
      dataFields.forEach((dataField, index) => {
        const inputElement = inputElements[index];
        expect(inputElement.getAttribute('type')).toEqual(dataField.type);
        expect(inputElement.value).toEqual(dataField.value.toString());
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
          property: 'name1',
          value: 'name2'
        },
        {
          type: 'number',
          displayName: 'number 1',
          property: 'num1',
          value: 2
        }
      ];

      component.fields = dataFields;

      fixture.detectChanges();

      const inputElements = element.querySelectorAll('input');
      inputElements[0].value = 'name1';
      inputElements[1].value = 0;

      const event = new Event('input', {
        'bubbles': true,
        'cancelable': true
      });

      inputElements[0].dispatchEvent(event);
      inputElements[1].dispatchEvent(event);

      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('button.submit');
      button.click();

      expect(component.submit.emit).toHaveBeenCalledWith({
        name1: 'name1', num1: '0'
      });
    });
  });
});
