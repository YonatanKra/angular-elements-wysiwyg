import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxWithTextComponent } from './box-with-text.component';

describe('BoxWithTextComponent', () => {
  let component: BoxWithTextComponent;
  let fixture: ComponentFixture<BoxWithTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxWithTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a div with the text from the elementData', () => {
    component.elementData = {
      text: 'test text',
      textColor: 'red',
      borderColor: 'blue',
      borderRadius: 5,
      backgroundColor: 'purple',
      width: 50,
      height: 55
    };

    fixture.detectChanges();

    const shadowRoot: DocumentFragment = fixture.debugElement.nativeElement.shadowRoot;
    const boxElement = shadowRoot.querySelector('.box-with-text');
    const boxElementStyles = window.getComputedStyle(boxElement);
    expect(boxElement.innerText).toEqual(component.elementData.text);

    expect(boxElement.style.color).toEqual(component.elementData.textColor);
    expect(boxElement.style.backgroundColor).toEqual(component.elementData.backgroundColor);
    expect(boxElementStyles['border-radius']).toEqual(component.elementData.borderRadius + 'px');
    expect(boxElement.style.border).toEqual(`1px solid ${component.elementData.borderColor}`);
    expect(boxElement.style.width).toEqual(component.elementData.width + 'px');
    expect(boxElement.style.height).toEqual(component.elementData.height + 'px');
  });
});
