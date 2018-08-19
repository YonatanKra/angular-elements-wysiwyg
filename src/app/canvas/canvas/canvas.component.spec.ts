import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CanvasComponent} from './canvas.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ElementWrapperComponent} from '../../elements/element-wrapper/element-wrapper.component';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent, ElementWrapperComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('user interaction', () => {
    it(`should emit an event 'canvasClicked' on click`, () => {
      spyOn(component.clickEvent, 'emit');

      fixture.debugElement.nativeElement.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(component.clickEvent.emit).toHaveBeenCalledWith('canvasClicked');
    });
  });

  describe('show elements', function () {
    it('should show a list of editorElementWrapper', () => {
      const elementSpec = {
        type: 'custom-element',
        position: {
          top: 50,
          left: 50
        },
        data: {}
      };
      component.items = [elementSpec, elementSpec, elementSpec];
      fixture.detectChanges();
      const nativeElement = fixture.debugElement.nativeElement;
      expect(nativeElement.querySelectorAll(elementSpec.type).length).toEqual(component.items.length);
    });
  });
});
