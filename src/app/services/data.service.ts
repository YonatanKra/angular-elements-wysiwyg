import {EventEmitter, Injectable} from '@angular/core';
import {ElementSpecs} from '../elements/models/element-specs';

const elementTypes = ['box-with-text'];
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public _canvasData: Array<ElementSpecs> = [];
  private _createData() {
    const data = [];
    for (let i = 0; i < Math.random() * 100 + 10; i++) {
      data.push(new ElementSpecs());
      data[i].type = elementTypes[Math.round(Math.random() * (elementTypes.length - 1))];
      data[i].position = {top: Math.random() * 400, left: Math.random() * 300};
      data[i].data =  {text: Math.random().toString(), backgroundColor: 'red', height: 150 * Math.random() + 50, width: 150 * Math.random() + 320};
    }
    return data;
  }

  public canvasData = new EventEmitter();

  constructor() {

  }

  updateCanvasData(data?: Array<ElementSpecs>) {
    this._canvasData = data;
    this.canvasData.emit(data);
  }

  getCanvasData(cached?: boolean) {
    let canvasData = this._canvasData;
    if (cached !== true) {
      canvasData = this._createData();
    }
    this.updateCanvasData(canvasData);
  }
}
