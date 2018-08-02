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

    const boxElement = fixture.debugElement.nativeElement.querySelector('.box-with-text');
    const boxElementStyles = boxElement.style;
    expect(boxElement.innerText).toEqual(component.elementData.text);

    expect(boxElementStyles.color).toEqual(component.elementData.textColor);
    expect(boxElementStyles.backgroundColor).toEqual(component.elementData.backgroundColor);
    expect(boxElementStyles.borderRadius).toEqual(component.elementData.borderRadius + 'px');
    expect(boxElementStyles.border).toEqual(`1px solid ${component.elementData.borderColor}`);
    expect(boxElementStyles.width).toEqual(component.elementData.width + 'px');
    expect(boxElementStyles.height).toEqual(component.elementData.height + 'px');

  });
});
