import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementWrapperComponent } from './element-wrapper.component';

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
        position: {
          top: 50,
          left: 50
        }
      };

      fixture.detectChanges();

      verifyElementPlacement(elementData);
    });
  });

  function verifyElementPlacement(elementSpecs) {
    const nativeElement = fixture.debugElement.nativeElement;
    const appendedElement = nativeElement.querySelector(elementSpecs.type);
    expect(appendedElement).toBeTruthy();
    expect(appendedElement.style.position).toEqual('absolute');
    expect(appendedElement.style.top).toEqual(`${elementSpecs.position.top}px`);
    expect(appendedElement.style.left).toEqual(`${elementSpecs.position.left}px`);
  }
});