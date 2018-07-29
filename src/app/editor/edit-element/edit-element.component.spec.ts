import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElementComponent } from './edit-element.component';
import {EditorElementWrapperComponent} from '../../canvas/editor-element-wrapper/editor-element-wrapper.component';

describe('EditElementComponent', () => {
  let component: EditElementComponent;
  let fixture: ComponentFixture<EditElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditElementComponent, EditorElementWrapperComponent ]
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

      component.elementSpecs = {
        type: 'custom-div',
        data: {customData: 42},
        position: {
          top: 50,
          left: 50
        }
      };

      fixture.detectChanges();

      expect(computedStyles.display).toEqual('block');
    });

    it('should show the element\'s edit form inside the modal', () => {
      const element = fixture.nativeElement;

      component.elementSpecs = {
        type: 'custom-div',
        data: {customData: 42},
        position: {
          top: 50,
          left: 50
        }
      };

      fixture.detectChanges();

      expect(element.querySelectorAll('custom-div-editor').length).toEqual(1);
    });

    it('should update modal contents when data changes and modal is open', () => {
      const element = fixture.nativeElement;

      component.elementSpecs = {
        type: 'custom-div',
        data: {customData: 42},
        position: {
          top: 50,
          left: 50
        }
      };

      fixture.detectChanges();

      component.elementSpecs = {
        type: 'custom-div2',
        data: {customData: 43},
        position: {
          top: 50,
          left: 50
        }
      };

      fixture.detectChanges();

      expect(element.querySelectorAll('custom-div-editor').length).toEqual(0);
      expect(element.querySelectorAll('custom-div2-editor').length).toEqual(1);
    });
  });

  describe('form interaction', () => {
    it('should send elementUpdate event using an event emitter', () => {
      component.save();
      expect(component.saveEvent.emit).toHaveBeenCalledWith('elementDataUpdate');
    });
  });
});
