import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import * as _ from 'lodash';
import {ElementSpecs} from "./elements/models/element-specs";

describe('AppComponent', () => {
  let fixture, component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  describe(`canvasClick`, () => {
    it(`should set elementSpecs as empty element data when no id is sent`, () => {
      (window.event as any) = {
        target: document.createElement('app-canvas')
      };
      const nElementsBefore = component.elements.length;
      component.canvasClick('canvasClicked');
      expect(component.elementSpecs instanceof ElementSpecs).toBeTruthy();
      expect(component.elements.length).toEqual(nElementsBefore);
    });

    it(`should set elementSpecs with data of element with given ID`, () => {
      for (let i = 0; i < 100; i++) {
        component.elements.push(new ElementSpecs({}));
      }
      (window.event as any) = {
        target: document.createElement('div')
      };
      const id = component.elements[5].id;
      const nElementsBefore = component.elements.length;

      (event.target as any).setAttribute('id', id);

      component.canvasClick('canvasClicked');
      expect(component.elementSpecs instanceof ElementSpecs).toBeTruthy();
      expect(_.findIndex(component.elements,
        (val) => val.id === component.elementSpecs.id)).toEqual(5);
      expect(component.elements.length).toEqual(nElementsBefore);
    });
  });

  describe('save event', () => {
    it(`should add a new element if doesn't exist`, () => {
      component.elements.push(new ElementSpecs());
      const nLength = component.elements.length;
      component.saveEvent(new ElementSpecs());
      expect(component.elements.length).toEqual(nLength + 1);
    });

    it(`should update the element if exists`, () => {
      component.elements.push(new ElementSpecs());
      const index = component.elements.push(new ElementSpecs());
      component.elements.push(new ElementSpecs());
      const nLength = component.elements.length;

      const newElement = new ElementSpecs({}, component.elements[index].id);
      newElement.data = 'this is new data we should update';
      component.saveEvent(newElement);

      expect(component.elements.length).toEqual(nLength);
      expect(component.elements[index]).toEqual(newElement);
    });
  });
});
