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
      component.canvasClick('canvasClicked');
      expect(component.elementSpecs instanceof ElementSpecs).toBeTruthy();
    });

    it(`should set elementSpecs with data of element with given ID`, () => {
      for (let i = 0; i < 100; i++) {
        component.elements.push(new ElementSpecs({}));
      }
      (window.event as any) = {
        target: document.createElement('div')
      };
      const id = component.elements[5].id;
      (event.target as any).setAttribute('id', id);

      component.canvasClick('canvasClicked');
      expect(component.elementSpecs instanceof ElementSpecs).toBeTruthy();
      expect(_.findIndex(component.elements,
        (val) => val.id === component.elementSpecs.id)).toEqual(5);
    });
  });
});
