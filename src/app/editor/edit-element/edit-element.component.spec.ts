import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditElementComponent} from './edit-element.component';
import {ElementWrapperComponent} from '../../elements/element-wrapper/element-wrapper.component';
import {Position} from '../../elements/models/position';
import {ElementSpecs} from '../../elements/models/element-specs';

describe('EditElementComponent', () => {
  let component: EditElementComponent;
  let fixture: ComponentFixture<EditElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditElementComponent, ElementWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('open a modal window when data changes', () => {
    it('should be closed before interaction', () => {
      const element = fixture.nativeElement;
      const computedStyles = window.getComputedStyle(element);
      expect(computedStyles.display).toEqual('none');
    });

    it('should show modal when data changes and modal isn\'t shown', () => {
      const element = fixture.nativeElement;
      const computedStyles = window.getComputedStyle(element);

      component.elementSpecs = new ElementSpecs({
        type: 'custom-div',
        data: {customData: 42},
        position: new Position(50, 50)
      });

      fixture.detectChanges();

      expect(computedStyles.display).toEqual('block');
    });

    it('should show the element\'s edit form inside the modal', () => {
      const element = fixture.nativeElement;

      component.elementSpecs = new ElementSpecs({
        type: 'custom-div',
        data: {customData: 42},
        position: new Position(50, 50)
      });


      fixture.detectChanges();

      expect(element.querySelectorAll('custom-div-editor').length).toEqual(1);
    });

    it('should update modal contents when data changes and modal is open', () => {
      const element = fixture.nativeElement;

      component.elementSpecs = new ElementSpecs({
        type: 'custom-div',
        data: {customData: 42},
        position: new Position(50, 50)
      });

      fixture.detectChanges();

      component.elementSpecs = new ElementSpecs({
        type: 'custom-div2',
        data: {customData: 43},
        position: new Position(50, 50)
      });

      fixture.detectChanges();

      expect(element.querySelectorAll('custom-div-editor').length).toEqual(0);
      expect(element.querySelectorAll('custom-div2-editor').length).toEqual(1);
    });
  });

  describe('form interaction', () => {
    it('should update the element when changing the type selector', () => {
      const element = fixture.nativeElement;
      const elementSpecs = new ElementSpecs({
        type: 'custom-div',
        data: {customData: 42},
        position: new Position(50, 50)
      });
      component.elementSpecs = elementSpecs;
      component.items = [
        {
          type: 'custom-div'
        },
        {
          type: 'my-custom-div'
        }
      ];

      fixture.detectChanges();

      const selectElement = element.querySelector('select');
      selectElement.value = 'my-custom-div';
      selectElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(element.querySelectorAll('custom-div-editor').length).toEqual(0);
      expect(element.querySelectorAll('my-custom-div-editor').length).toEqual(1);
    });

    it('should send elementUpdate event using an event emitter', () => {
      component.elementSpecs = new ElementSpecs();
      component.elementSpecs.data = {};
      component.typeChange('my-element-editor');
      spyOn(component.saveEvent, 'emit');
      component.save();

      const emitPayload = (component.saveEvent.emit as any).calls.mostRecent().args[0];
      const isEmitEqualElementSpec = Object.keys(emitPayload).reduce((same, key) => {
        if (key === 'type') {
          return same && component.elementSpecs[key] === (emitPayload[key] + '-editor');
        }
        return same && component.elementSpecs[key] === emitPayload[key];
      }, true);

      expect(component.saveEvent.emit).toHaveBeenCalled();
      expect(isEmitEqualElementSpec).toBeTruthy();
    });
  });
});
