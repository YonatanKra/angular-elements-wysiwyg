import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasComponent ]
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

      // trigger the click

      fixture.debugElement.nativeElement.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(component.clickEvent.emit).toHaveBeenCalledWith('canvasClicked');
    });
  });

  describe('addElementToDom', () => {
    it('should add an element to the DOM in the right position', () => {
      const elementSpecs = {
        type: 'custom-div',
        data: {customData: 42},
        position: {
          top: 50,
          left: 50
        }
      };

      const nativeElement = fixture.debugElement.nativeElement;
      component.addElementToDom(elementSpecs);

      expect(nativeElement.querySelector(elementSpecs.type)).toBeTruthy();
    });
  });
});
