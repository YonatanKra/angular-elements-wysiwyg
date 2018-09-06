import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementWrapperComponent } from './element-wrapper.component';
import { Position } from '../models/position';

describe('EditorElementWrapperComponent', () => {
  let component: ElementWrapperComponent;
  let fixture: ComponentFixture<ElementWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // test our usecase
  describe('DOM append and updates', () => {
    it('should update the element when data changes', () => {
      const elementData = component.elementData = {
        type: 'custom-div',
        data: {customData: 42},
        position: new Position(50, 50)
      };

      fixture.detectChanges();

      verifyElementPlacement(elementData);
    });

    it('should add events if events exist', () => {
      const elementData =  {
        type: 'custom-div',
        data: {customData: 42},
        position: new Position(50, 50),
        events: {
          someEvent: () => {}
        }
      };

      const event = new Event('someEvent');
      spyOn(elementData.events, 'someEvent').and.callThrough();
      component.elementData = elementData;
      fixture.detectChanges();
      const nativeElement = fixture.debugElement.nativeElement;
      const appendedElement = nativeElement.querySelector(elementData.type);
      appendedElement.dispatchEvent(event);

      expect(elementData.events.someEvent).toHaveBeenCalled();

      //TODO::trigger the someEvent event and see that the method has been ran
    });
  });

  function verifyElementPlacement(elementSpecs) {
    const nativeElement = fixture.debugElement.nativeElement;
    const appendedElement = nativeElement.querySelector(elementSpecs.type);
    expect(appendedElement).toBeTruthy();
    expect(appendedElement.style.top).toEqual(`${elementSpecs.position.top}px`);
    expect(appendedElement.style.left).toEqual(`${elementSpecs.position.left}px`);
  }
});
