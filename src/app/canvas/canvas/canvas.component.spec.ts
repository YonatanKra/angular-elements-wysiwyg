import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CanvasComponent} from './canvas.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ElementWrapperComponent} from "../../elements/element-wrapper/element-wrapper.component";
class Position {
  public top = 0;
  public left = 0;
}
class ElementSpecs {
  public type = '';
  public position: Position = new Position();
  public data: any;
  constructor(data?: ElementSpecs) {
    if (!data) {
      return;
    }

    this.type = data.type;
    if (data.position) {
      this.position.top = data.position.top ? data.position.top : 0;
      this.position.left = data.position.left ? data.position.left : 0;
    }
    this.data = data.data;
  }
}

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
      const elementSpec = new ElementSpecs({
        type: 'custom-element',
        position: {
          top: 50,
          left: 50
        },
        data: {}
      });
      component.items = [elementSpec, elementSpec, elementSpec];
      fixture.detectChanges();
      const nativeElement = fixture.debugElement.nativeElement;
      expect(nativeElement.querySelectorAll(elementSpec.type).length).toEqual(component.items.length);
    });
  });
});
