import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
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

  describe('show elements', function() {
    it('should show a list of editorElementWrapper', () => {
      component.items = [{}, {}, {}];
      fixture.detectChanges();
      const nativeElement = fixture.debugElement.nativeElement;
      expect(nativeElement.querySelectorAll('app-editor-element-wrapper').length).toEqual(component.items.length);
    });
  });
});
