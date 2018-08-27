import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-box-with-text',
  template: `
    <div class="box-with-text" [ngStyle]="boxStyles">
      {{elementData.text}}
    </div>
  `,
  styleUrls: ['./box-with-text.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BoxWithTextComponent {

  public _elementData;
  public boxStyles = {
    color: 'black',
    border: ``,
    'border-radius': ``,
    backgroundColor: `white`,
    width: `200`,
    height: `200`,
  };

  @Input()
  set elementData(data) {
    this._elementData = data;
    this.updateBox(data);
  }

  get elementData() {
    return this._elementData ? this._elementData : {};
  }

  constructor() {
  }

  private updateBox(elementData) {
    this.boxStyles.color = elementData.textColor;
    this.boxStyles.border = `1px solid ${elementData.borderColor}`;
    this.boxStyles['border-radius'] = `${elementData.borderRadius}px`;
    this.boxStyles.backgroundColor = `${elementData.backgroundColor}`;
    this.boxStyles.width = `${elementData.width}px`;
    this.boxStyles.height = `${elementData.height}px`;
  }
}
